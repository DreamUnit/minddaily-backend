import { IDataSource } from "../dataSources/DataSource";
import { IDiary } from "../graphql/mappers/Diary";
import { IFilterOpts, IModel } from "./types/Common";
import { IFilter, ISort } from "./types/Diary";

export class DiaryModel implements IModel<IDiary> {
    private readonly source: string = "diaries";
    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IDiary | null> {
        const data = await this.dataSource.readById<IDiary>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async fetchByField(filter: IFilterOpts): Promise<IDiary | null> {
        // Implementation to fetch diaries by a field using dataSource
        throw new Error("not implemented yet");
    }

    async fetchMany(take: number, skip: number): Promise<IDiary[] | []> {
        const data = await this.dataSource.read<IFilter, ISort, IDiary>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );
        return data || [];
    }
}
