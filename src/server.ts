import { DataSourceContext } from "./context";
import { expressMiddleware } from "@apollo/server/express4";
import routes from "./routes/index";
import { DataManager } from "./config/dataServices.service";
import { app, httpServer, apolloServer } from "./app";

export async function startServer() {
    const { logger, dataSource } = DataManager.getInstance();
    await dataSource.connect();
    await apolloServer.start();
    app.use(
        routes.protectedRouter,
        expressMiddleware(apolloServer, {
            context: async ({ req }): Promise<DataSourceContext> => {
                return {
                    dataSources: {
                        mongodbDataSource: dataSource,
                    },
                };
            },
        })
    );

    await new Promise<void>(resolve =>
        httpServer.listen({ port: process.env.SERVER_PORT }, resolve)
    );

    logger.info(`🚀 Server ready at ${process.env.SCHEMA_PORT}`);
}
