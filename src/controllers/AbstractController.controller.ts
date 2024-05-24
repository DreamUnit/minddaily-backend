import { ILogger } from "../utils/Logger.types";

abstract class AbstractController {
    public readonly logger: ILogger;
    constructor(logger: ILogger) {
        this.logger = logger;
    }
}

export default AbstractController;
