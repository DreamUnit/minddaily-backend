import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import routes from "./routes/index";
import { DataSourceContext } from "./context";
import googleStrategy from "./auth/passport.auth";
import sessionConfig from "./auth/session.auth";
import { typeDefs } from "./features/index.schemas";
import { resolvers } from "./features/index.resolvers";
import dotenv from "dotenv";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cookieParser from "cookie-parser";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../production.env"
            : "../development.env"
    ),
});
export const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(
//     cors<cors.CorsRequest>({
//         origin: process.env.CORS_DOMAINS.split(","),
//         credentials: true,
//     })
// );
console.log(process.env.CORS_DOMAINS.split(","));
const corsOptions = {
    origin: function (origin, callback) {
        console.log("origin:", origin);
        const allowedDomains = process.env.CORS_DOMAINS.split(",");
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log("failing origin:", origin);

            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

export const httpServer = http.createServer(app);
export const apolloServer = new ApolloServer<DataSourceContext>({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV === "development",
});

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes.publicRouter);

passport.use(googleStrategy);
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
