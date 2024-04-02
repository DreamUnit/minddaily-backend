import protectedRouter from "./protected/graphqlRoute";
import publicRouter from "./public/AuthRoutes";

const routes = { publicRouter, protectedRouter };
export default routes;
