import { MongodbDataSource } from "./dataSources/MongodbDataSource.datasource";
import { IUser } from "./graphql/user.mapper";

export type DataSourceContext = {
    user?: IUser;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
