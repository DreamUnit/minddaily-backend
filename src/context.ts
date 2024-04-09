import { MongodbDataSource } from "./dataSources/MongodbDataSource.datasource";
import { IUser } from "./graphql/user.types";

export type DataSourceContext = {
    user?: IUser;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
