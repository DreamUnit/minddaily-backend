import { ApolloServer } from "@apollo/server";
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
import { IUser } from "./graphql/mappers/User";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./express/AuthRoutes";
import { startServer } from "./server";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../production.env"
            : "../development.env"
    ),
});

export interface IContext {
    user?: IUser;
    token?: string;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
}

export const app = express();
export const httpServer = http.createServer(app);

export const server =
    process.env.NODE_ENV === "production"
        ? new ApolloServer<IContext>({
              typeDefs,
              resolvers,
              plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
          })
        : new ApolloServer<IContext>({
              typeDefs,
              resolvers,
              plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
              introspection: true,
          });

// need a better way of instantiating classes in the future.
////////////////////////
// Class Instantiatiion
////////////////////////
export const logger: ILogger = new Logger(new WinstonLogger());
export const dataSource = new MongodbDataSource(
    process.env.MONGODB_DSN,
    logger
);
export const userModel = new UserModel(dataSource);
export const diaryModel = new DiaryModel(dataSource);
export const diaryNotesModel = new DiaryNotesModel(dataSource);
////////////////////////
////////////////////////
////////////////////////

app.use(express.json());
app.use(
    cors<cors.CorsRequest>({
        origin: ["*"],
    })
);
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

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALL_BACK_URL,
        },
        async function (_, __, profile, cb) {
            const existingUser = await userModel.readByField({
                field: "authUserId",
                stringValue: profile.id,
            });
            if (existingUser[0] == null) {
                const newUser = userModel.create({
                    authUserId: profile.id,
                    name: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile.emails[0].value,
                    locale: profile._json.locale,
                });
                return cb(null, newUser);
            }
            return cb(null, existingUser);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
///////////////////////////
startServer();
