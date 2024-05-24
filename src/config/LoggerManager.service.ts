import { Logger } from "../utils/Logger.util";
import { WinstonLogger } from "../utils/WinstonLogger.util";

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
        const loggerType = process.env.LOGGER_TYPE || "winston";
        switch (loggerType) {
            case "winston":
                this.logger = new Logger(new WinstonLogger());
                break;
            case "rollbar":
                throw new Error("Not implemented yet");
            default:
                this.logger = new Logger(new WinstonLogger());
                break;
        }
    }

    public static getInstance() {
        if (!LoggerManager.instance) {
            LoggerManager.instance = new LoggerManager();
        }
        return LoggerManager.instance;
    }
}
