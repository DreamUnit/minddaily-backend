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

export const app = express();
export const httpServer = http.createServer(app);
export const apolloServer = new ApolloServer<DataSourceContext>({
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
