import { IDataSource } from "../dataSources/DataSource";
import { IDiaryNote } from "../graphql/mappers/DiaryNotes";
import { IFilterOpts, IModel } from "./types/Common";

export class DiaryNotesModel implements IModel<IDiaryNote> {
    private readonly source: string = "diary_notes";
    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IDiaryNote | null> {
        const data = await this.dataSource.readById<IDiaryNote>(
            this.source,
            id
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async fetchByField(filter: IFilterOpts): Promise<IDiaryNote | null> {
        // Implementation to fetch diaries by a field using dataSource
        throw new Error("not implemented yet");
    }

    async fetchMany(take: number, skip: number): Promise<IDiaryNote[] | []> {
        // Implementation to fetch diaries with pagination using dataSource
        throw new Error("not implemented yet");
    }
}
