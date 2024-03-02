import winston from "winston";

export class WinstonLogger {
    private winstonLogger: winston.Logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "combined.log" }),
        ],
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
