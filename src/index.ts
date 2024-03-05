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

dotenv.config();

interface IContext {
    token?: string;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// need a better way of instantiating classes in the future.
export const dataSource = new MongodbDataSource(
    process.env.MONGODB_CONNECTION_STRING
);
export const userModel = new UserModel(dataSource);
export const diaryModel = new DiaryModel(dataSource);
export const diaryNotesModel = new DiaryNotesModel(dataSource);

export const logger: ILogger = new Logger(new WinstonLogger());
logger.info("This is an informational message");

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
                return {
                    token: req.headers.token as string | undefined,
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
