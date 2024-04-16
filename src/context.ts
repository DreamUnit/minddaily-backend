import { MongodbDataSource } from "./dataSources/MongodbDataSource.datasource";
import { IUser } from "./features/user/user.types";

export type DataSourceContext = {
    user?: IUser;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
