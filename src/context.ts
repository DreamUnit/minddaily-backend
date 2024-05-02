import { MongodbDataSource } from "./dataSources/MongodbDataSource.datasource";

export type DataSourceContext = {
    user?: string;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
