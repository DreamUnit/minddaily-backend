import { IDataSource } from "./dataSources/DataSource.datasource";

export type DataSourceContext = {
    user?: string;
    dataSource: IDataSource;
};
