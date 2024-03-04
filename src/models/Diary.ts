import { MongodbDataSource } from "../dataSources/MongodbDataSource";
import { IDiary } from "../graphql/mappers/Diary";
import { IFilterOpts, IRead, IReadMany } from "./Common";

// seperate into seperate file
export interface IDiaryModel {
    fetchDiaries(take: number, skip: number): Promise<IReadMany<IDiary>>;
    fetchDiaryByField(filter: IFilterOpts): Promise<IReadMany<IDiary>>;
    fetchDiaryById(id: string): Promise<IRead<IDiary>>;
}

export class DiaryModel implements IDiaryModel {
    constructor(private dataSource: MongodbDataSource) {}

    async fetchDiaries(take: number, skip: number): Promise<IReadMany<IDiary>> {
        // Implementation that uses this.dataSource to fetch products
        throw new Error("not implemented yet");
    }

    async fetchDiaryByField(filter: IFilterOpts): Promise<IReadMany<IDiary>> {
        throw new Error("not implemented yet");
    }

    async fetchDiaryById(id: string): Promise<IRead<IDiary>> {
        throw new Error("not implemented yet");
    }
}
