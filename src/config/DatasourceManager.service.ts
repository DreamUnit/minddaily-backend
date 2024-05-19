import dotenv from "dotenv";
import path from "path";
import { MongodbDataSource } from "../dataSources/MongodbDataSource.datasource";
import { WinstonLogger } from "../utils/WinstonLogger.util";
import { Logger } from "../utils/Logger.util";
import { IDataSource } from "../dataSources/DataSource.datasource";
import { LoggerManager } from "./LoggerManager.service";

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
    private static instance: DatasourceManager | null = null;
    public dataSource: IDataSource;

    /** Dynamically create Data Source dependent on .env variable */
    private constructor() {
        const type = process.env.DATABASE_TYPE;
        switch (type) {
            case "mongodb":
                this.dataSource = new MongodbDataSource(
                    process.env.MONGODB_DSN,
                    LoggerManager.getInstance().logger
                );
                break;
            case "sql":
                throw new Error("Not implemented yet");
            default:
                throw new Error("Invalid or unsupported data source type");
        }
    }

    public static getInstance(): DatasourceManager {
        if (!DatasourceManager.instance) {
            DatasourceManager.instance = new DatasourceManager();
        }
        return DatasourceManager.instance;
    }
}
