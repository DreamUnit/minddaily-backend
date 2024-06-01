import dotenv from "dotenv";
import path from "path";
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
        const dataSourceClassName = `${process.env.DATABASE_TYPE}DataSource`;
        try {
            const dataSourceModule = require(`../dataSources/${dataSourceClassName}.datasource`);
            const dataSourceClass = dataSourceModule[dataSourceClassName];
            this.dataSource = new dataSourceClass(
                process.env[`${process.env.DATABASE_TYPE.toUpperCase()}_DSN`],
                LoggerManager.getInstance().logger
            );
        } catch (error) {
            throw new Error(
                `Unknown Adapter Type: ${process.env.DATABASE_TYPE} - ${error.message}`
            );
        }
    }

    public static getInstance(): DatasourceManager {
        return DatasourceManager.instance
            ? DatasourceManager.instance
            : (DatasourceManager.instance = new DatasourceManager());
    }
}
