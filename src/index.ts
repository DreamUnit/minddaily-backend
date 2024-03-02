import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./graphql/schemas/index";
import { resolvers } from "./graphql/resolvers/index";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ILogger } from "./utils/types/Logger";
import { WinstonLogger } from "./utils/logging/WinstonLogger";
import { Logger } from "./utils/logging/Logger";

dotenv.config();
const logger: ILogger = new Logger(new WinstonLogger());

logger.info("This is an informational message");

interface IContext {
    token?: string;
    //     dataSources: {};
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
    const mongoURI = process.env.MONGODB_CONNECTION_STRING;
    mongoose
        .connect(mongoURI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error("MongoDB connection error:", err));

    await server.start();

    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: ["*"],
        }),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        })
    );

    await new Promise<void>(resolve =>
        httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer();
