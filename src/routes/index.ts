import protectedRouter from "./graphqlRoute.protected";
import publicRouter from "./AuthRoutes.public";

const routes = { publicRouter, protectedRouter };
export default routes;
