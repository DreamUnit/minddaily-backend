import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./graphql/schemas/index";
import { resolvers } from "./graphql/resolvers/index";
import dotenv from "dotenv";
import { ILogger } from "./utils/types/Logger";
import { WinstonLogger } from "./utils/logging/WinstonLogger";
import { Logger } from "./utils/logging/Logger";
import { MongodbDataSource } from "./dataSources/MongodbDataSource";
import { DiaryModel } from "./models/Diary";
import { UserModel } from "./models/User";
import { DiaryNotesModel } from "./models/DiaryNotes";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTime } from "luxon";
import { UserSchema } from "./schemas/UserSchema";
import mongoose from "mongoose";
import { GoogleStrategy } from "passport-google-oauth20";
import { IUser } from "./graphql/mappers/User";
import { passport } from "passport";

dotenv.config();

const mocks = {
    DateTime: () => DateTime.now().toISO(),
};

interface IContext {
    user?: IUser;
    token?: string;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
}

const app = express();
const httpServer = http.createServer(app);

const server =
    process.env.NODE_ENV === "production"
        ? new ApolloServer<IContext>({
              typeDefs,
              resolvers,
              plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
          })
        : new ApolloServer<IContext>({
              // schema: addMocksToSchema({
              //     schema: makeExecutableSchema({ typeDefs, resolvers }),
              //     mocks,
              // }),
              typeDefs,
              resolvers,
              plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
              introspection: true,
          });

// need a better way of instantiating classes in the future.
export const logger: ILogger = new Logger(new WinstonLogger());
export const dataSource = new MongodbDataSource(
    process.env.MONGODB_DSN,
    logger
);
export const UserSchemaModel = mongoose.model("users", UserSchema);
export const userModel = new UserModel(dataSource);

export const diaryModel = new DiaryModel(dataSource);
export const diaryNotesModel = new DiaryNotesModel(dataSource);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, cb) {
            // Here, you would find or create a user in your database
            // For example, User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
            console.log(profile); // Log the profile information to the console
            cb(null, profile); // Assuming the profile is the user object
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

async function startServer() {
    await dataSource.connect();
    await server.start();

    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: ["*"],
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }): Promise<IContext> => {
                // const user: IUser | undefined = user
                //     ? await userModel.readByField()
                //     : undefined;

                return {
                    token: req.headers.token as string | undefined,
                    user,
                    dataSources: {
                        mongodbDataSource: dataSource,
                    },
                };
            },
        })
    );

    await new Promise<void>(resolve =>
        httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer();
