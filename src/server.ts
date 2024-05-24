import { DataSourceContext } from "./context";
import { expressMiddleware } from "@apollo/server/express4";
import routes from "./routes/index";
import { DatasourceManager } from "./config/DatasourceManager.service";
import { app, httpServer, apolloServer } from "./app";
import { LoggerManager } from "./config/LoggerManager.service";

export async function startServer() {
    const { logger } = LoggerManager.getInstance();
    const { dataSource } = DatasourceManager.getInstance();
    await dataSource.connect();
    await apolloServer.start();
    app.use(
        routes.protectedRouter,
        expressMiddleware(apolloServer, {
            context: async ({ req }): Promise<DataSourceContext> => {
                return {
                    dataSource: dataSource,
                };
            },
        })
    );

    await new Promise<void>(resolve =>
        httpServer.listen({ port: process.env.SERVER_PORT }, resolve)
    );

    logger.info(`🚀 Server ready at ${process.env.SCHEMA_PORT}`);
}
