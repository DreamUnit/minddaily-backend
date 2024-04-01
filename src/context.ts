import { MongodbDataSource } from "./dataSources/MongodbDataSource";
import { IUser } from "./graphql/mappers/User";

export type DataSourceContext = {
    user?: IUser;
    dataSources: {
        mongodbDataSource: MongodbDataSource;
    };
};
