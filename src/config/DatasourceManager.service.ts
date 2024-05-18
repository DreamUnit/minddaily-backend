import dotenv from "dotenv";
import path from "path";
import { MongodbDataSource } from "../dataSources/MongodbDataSource.datasource";
import { WinstonLogger } from "../utils/WinstonLogger.util";
import { Logger } from "../utils/Logger.util";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../../production.env"
            : "../../development.env"
    ),
});
/**
 *  We are using the singleton pattern here to instantiate our datasource
 * if there is already an instance we retrieve the already running instance of our data
 * source thus encapsulating our datasource instantiation, not instantiating the datasource in
 * global scope and preventing multiple datasource connections.
 */
export class DatasourceManager {
    static instance: DatasourceManager | null = null;
    public logger: Logger;
    public dataSource: MongodbDataSource;

    constructor() {
        if (DatasourceManager.instance) {
            return DatasourceManager.instance;
        }
        this.initDatasource();
        DatasourceManager.instance = this;
    }

    initDatasource() {
        // Logger instantiation
        this.logger = new Logger(new WinstonLogger());

        this.dataSource = new MongodbDataSource(
            process.env.MONGODB_DSN,
            this.logger
        );
    }

    static getInstance() {
        if (!DatasourceManager.instance) {
            DatasourceManager.instance = new DatasourceManager();
        }
        return DatasourceManager.instance;
    }
}
