import { Logger } from "./Logger.util";

describe("Logger class", () => {
    let mockILogger;

    beforeEach(() => {
        mockILogger = {
            info: jest.fn(),
            error: jest.fn(),
            warning: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it("delegates info logging to ILogger", () => {
        const logger = new Logger(mockILogger);
        const message = "Test info message";
        const meta = { key: "value" };

        logger.info(message, meta);

        expect(mockILogger.info).toHaveBeenCalledWith(message, meta);
    });

    it("delegates error logging to ILogger", () => {
        const logger = new Logger(mockILogger);
        const message = "Test error message";
        const meta = { key: "value" };

        logger.error(message, meta);

        expect(mockILogger.error).toHaveBeenCalledWith(message, meta);
    });

    it("delegates warning logging to ILogger", () => {
        const logger = new Logger(mockILogger);
        const message = "Test warning message";
        const meta = { key: "value" };

        logger.warning(message, meta);

        expect(mockILogger.warning).toHaveBeenCalledWith(message, meta);
    });
});
