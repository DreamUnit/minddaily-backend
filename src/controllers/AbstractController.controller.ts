import { logger } from "../config/dataServices.service";
import { ILogger } from "../utils/Logger.types";

abstract class AbstractController {
    public readonly logger: ILogger = logger;
}

export default AbstractController;
