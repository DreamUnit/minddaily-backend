import { MongodbDataSource } from "./dataSources/MongodbDataSource";

export type DataSourceContext = {
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
