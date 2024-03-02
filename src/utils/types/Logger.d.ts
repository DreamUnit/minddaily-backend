export interface ILogger {
    info(message: string, meta?: Record<string, any>): void;
    error(message: string, meta?: Record<string, any>): void;
    warning(message: string, meta?: Record<string, any>): void;
}
