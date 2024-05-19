import { LoggerManager } from "../config/LoggerManager.service";
import AuthController from "./Auth.controller";

const { logger } = LoggerManager.getInstance();
const authController = new AuthController(logger);

export default authController;
