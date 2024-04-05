import winston from "winston";
import { ILogger } from "../types/Logger";

export class WinstonLogger implements ILogger {
    private winstonLogger: winston.Logger = winston.createLogger({
        format: winston.format.cli(),
        transports: [new winston.transports.Console()],
    });

    public info(message: string, meta: Record<string, any> = {}): void {
        this.winstonLogger.log({
            level: "info",
            message: message,
        });
    }

    public error(message: string, meta: Record<string, any> = {}): void {
        this.winstonLogger.log({
            level: "error",
            message: message,
        });
    }

    public warning(message: string, meta: Record<string, any> = {}): void {
        this.winstonLogger.log({
            level: "warning",
            message: message,
        });
    }
}
