import { IDataSource } from "../dataSources/DataSource";
import { IUser } from "../graphql/mappers/User";
import { IFilterOpts, IModel, IRead, IReadMany } from "./Common";

export class UserModel implements IModel<IUser> {
    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IRead<IUser>> {
        // Implementation to fetch a diary by ID using dataSource
        throw new Error("not implemented yet");
    }

    async fetchByField(filter: IFilterOpts): Promise<IReadMany<IUser>> {
        // Implementation to fetch diaries by a field using dataSource
        throw new Error("not implemented yet");
    }

    async fetchMany(take: number, skip: number): Promise<IReadMany<IUser>> {
        // Implementation to fetch diaries with pagination using dataSource
        throw new Error("not implemented yet");
    }
}
