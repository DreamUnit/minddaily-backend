import { IDataSource } from "../dataSources/DataSource";
import { IDiary } from "../graphql/mappers/Diary";
import { IFilterOpts, IModel, IRead, IReadMany } from "./Common";

export class DiaryModel implements IModel<IDiary> {
    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IRead<IDiary>> {
        // Implementation to fetch a diary by ID using dataSource
        throw new Error("not implemented yet");
    }

    async fetchByField(filter: IFilterOpts): Promise<IReadMany<IDiary>> {
        // Implementation to fetch diaries by a field using dataSource
        throw new Error("not implemented yet");
    }

    async fetchMany(take: number, skip: number): Promise<IReadMany<IDiary>> {
        // Implementation to fetch diaries with pagination using dataSource
        throw new Error("not implemented yet");
    }
}
