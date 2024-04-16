import { app, httpServer, server } from ".";
import { DataSourceContext } from "./context";
import { expressMiddleware } from "@apollo/server/express4";
import routes from "./routes/index";
import { dataSource, logger } from "./config/dataServices.service";

export async function startServer() {
    await dataSource.connect();
    await server.start();
    app.use(
        routes.protectedRouter,
        expressMiddleware(server, {
            context: async ({ req }): Promise<DataSourceContext> => {
                const user = req.session?.passport?.user
                    ? req.session.passport.user.id
                    : undefined;
                return {
                    user,
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
