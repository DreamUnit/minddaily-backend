import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./graphql/schemas/index";
import { resolvers } from "./graphql/resolvers/index";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import session from "express-session";
import routes from "./routes/index";
import { startServer } from "./server";
import { DataSourceContext } from "./context";
import googleStrategy from "./auth/passport";
import sessionConfig from "./auth/session";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../production.env"
            : "../development.env"
    ),
});

export const app = express();
export const httpServer = http.createServer(app);
export const server = new ApolloServer<DataSourceContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV === "development",
});

app.use(express.json());
app.use(
    cors<cors.CorsRequest>({
        origin: process.env.CORS_DOMAINS.split(","),
    })
);
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

startServer();
