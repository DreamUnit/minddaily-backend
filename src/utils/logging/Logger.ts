import { ILogger } from "../types/Logger";

export class Logger {
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    public info(message: string, meta: Record<string, any> = {}): void {
        this.logger.info(message, meta);
    }

    public error(message: string, meta: Record<string, any> = {}): void {
        this.logger.error(message, meta);
    }

    public warning(message: string, meta: Record<string, any> = {}): void {
        this.logger.warning(message, meta);
    }
}
