import { DatasourceManager } from "../config/DatasourceManager.service";
import AuthController from "./Auth.controller";

const { logger } = DatasourceManager.getInstance();
const authController = new AuthController(logger);

export default authController;
