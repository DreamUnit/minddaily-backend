import { IDataSource } from "../dataSources/DataSource";
import { IDiaryNote } from "../graphql/mappers/DiaryNotes";
import { IFilterOpts, IModel, IRead, IReadMany } from "./Common";

export class DiaryNotesModel implements IModel<IDiaryNote> {
    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IRead<IDiaryNote>> {
        // Implementation to fetch a diary by ID using dataSource
        throw new Error("not implemented yet");
    }

    async fetchByField(filter: IFilterOpts): Promise<IReadMany<IDiaryNote>> {
        // Implementation to fetch diaries by a field using dataSource
        throw new Error("not implemented yet");
    }

    async fetchMany(
        take: number,
        skip: number
    ): Promise<IReadMany<IDiaryNote>> {
        // Implementation to fetch diaries with pagination using dataSource
        throw new Error("not implemented yet");
    }
}
