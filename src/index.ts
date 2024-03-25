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
import { IUser } from "./graphql/mappers/User";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

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
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALL_BACK_URL,
        },
        async function (_, __, profile, cb) {
            console.log("called");
            const existingUser = await userModel.readByField({
                field: "authUserId",
                stringValue: profile.id,
            });
            console.log("existingUser", existingUser);
            if (existingUser[0] == null) {
                console.log("create existing user");
                userModel.create({
                    authUserId: profile.id,
                    name: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile.emails[0].value,
                    locale: profile._json.locale,
                });
            }
            console.log(profile); // Log the profile information to the console
            return cb(null, profile); // Assuming the profile is the user object
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
        session: false,
    }),
    function (req, res) {
        res.redirect("/");
    }
);

async function startServer() {
    await dataSource.connect().then(() => {
        app.use(
            session({
                secret: "yourSecretKey",
                resave: false,
                saveUninitialized: true,
                store: MongoStore.create({
                    mongoUrl: process.env.MONGODB_DSN,
                }),
                cookie: {
                    secure: process.env.NODE_ENV === "production",
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                }, // 1 day
            })
        );
    });
    app.use(passport.initialize());
    app.use(passport.session());
    await server.start();

    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: ["*"],
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }): Promise<IContext> => {
                // Here, req.session is available thanks to express-session middleware
                // You can add any session-based logic here. For example:
                console.log("req middleware:", req.user);
                const userId = req.session.user.id;

                const user = userId
                    ? await userModel.readByField({
                          field: "id",
                          stringValue: userId,
                      })[0]
                    : null;
                console.log("user middleware:", user);
                return {
                    user, // Pass the user object to your GraphQL context
                    dataSources: {
                        mongodbDataSource: dataSource,
                    },
                };
            },
        })
    );

    await new Promise<void>(resolve =>
        httpServer.listen({ port: 8082 }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:8082/`);
}

startServer();
