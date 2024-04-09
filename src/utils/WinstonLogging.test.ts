import winston from "winston";
import { WinstonLogger } from "./WinstonLogger.util"; // Adjust the import path as necessary
jest.mock("winston", () => {
    return {
        createLogger: jest.fn().mockReturnValue({
            log: jest.fn(),
        }),
        format: {
            cli: jest.fn(),
        },
        transports: {
            Console: jest.fn(),
        },
    };
});

describe("WinstonLogger class", () => {
    let winstonLogger: WinstonLogger;

    beforeEach(() => {
        jest.clearAllMocks();
        winstonLogger = new WinstonLogger();
    });

    it("logs info messages correctly", () => {
        const message = "Test info message";
        winstonLogger.info(message);

        expect(winston.createLogger().log).toHaveBeenCalledWith({
            level: "info",
            message: message,
        });
    });

    it("logs error messages correctly", () => {
        const message = "Test error message";
        winstonLogger.error(message);

        expect(winston.createLogger().log).toHaveBeenCalledWith({
            level: "error",
            message: message,
        });
    });

    it("logs warning messages correctly", () => {
        const message = "Test warning message";
        winstonLogger.warning(message);

        expect(winston.createLogger().log).toHaveBeenCalledWith({
            level: "warning",
            message: message,
        });
    });
});
