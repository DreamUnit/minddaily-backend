import { IContext, app, dataSource, httpServer, server } from ".";
import { authenticateToken } from "./middleware/authenticateToken";
import { expressMiddleware } from "@apollo/server/express4";

export async function startServer() {
    await dataSource.connect();

    await server.start();
    app.use(
        "/",
        authenticateToken,
        expressMiddleware(server, {
            context: async ({ req }): Promise<IContext> => {
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
        httpServer.listen({ port: 8082 }, resolve)
    );

    console.log(`🚀 Server ready at http://localhost:8082/`);
}
