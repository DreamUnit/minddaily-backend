import { Logger } from "../utils/Logger.util";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../../production.env"
            : "../../development.env"
    ),
});
/** singleton pattern so we only have one Logger instance
 *
 */
export class LoggerManager {
    private static instance: LoggerManager | null = null;
    public logger: Logger;
    constructor() {
        if (LoggerManager.instance) {
            return LoggerManager.instance;
        }
        this.initLogger();
        LoggerManager.instance = this;
    }

    initLogger() {
        try {
            const loggerClassName = `${process.env.LOGGER_TYPE}Logger`;
            const LoggerModule = require(`../utils/${process.env.LOGGER_TYPE}Logger.util`);
            const LoggerClass = LoggerModule[loggerClassName];
            this.logger = new Logger(new LoggerClass());
        } catch (error) {
            console.log(
                `Error unknown logger: ${process.env.LOGGER_TYPE} - ${error.message}`
            );
        }
    }

    public static getInstance() {
        return LoggerManager.instance
            ? LoggerManager.instance
            : (LoggerManager.instance = new LoggerManager());
    }
}
