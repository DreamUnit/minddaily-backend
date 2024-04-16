import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { MongodbDataSource } from "./dataSources/MongodbDataSource.datasource";
import { httpServer } from ".";
import dotenv from "dotenv";
import path from "path";
import { IUser } from "./features/user/user.types";
import { typeDefs } from "./features/index.schemas";
import { resolvers } from "./features/index.resolvers";

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
export async function createApolloServer() {
    const server = new ApolloServer<IContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        introspection: process.env.NODE_ENV === "development",
    });
    await server.start();
    return server;
}
