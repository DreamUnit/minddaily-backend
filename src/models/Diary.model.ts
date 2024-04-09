import { IDataSource } from "../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../dataSources/DataSource.types";
import { IDiary } from "../graphql/diary.types";
import { DiarySchemaModel } from "../schemas/DiarySchema.schema";
import { AbstractModel, IFilterOpts } from "./common.types";
import { IFilter } from "./diary.types";

export class DiaryModel extends AbstractModel<IDiary> {
    private readonly source: string = "diaries";
    private readonly model = DiarySchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create<Data>(inputData: Data): Promise<IDiary> {
        const data = await this.dataSource.write<Data, IDiary>(
            this.source,
            this.model,
            {
                data: inputData,
            }
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async update<Data>(
        id: string | number,
        updatedData: Data
    ): Promise<IDiary> {
        const updatedDataResponse = await this.dataSource.update<
            Data,
            {},
            IDiary
        >(this.source, {
            id: id,
            data: updatedData,
        });
        return updatedDataResponse;
    }

    async delete(id: string | number): Promise<boolean> {
        const deleteResponse = await this.dataSource.deleteById(
            this.source,
            this.model,
            {
                id: id,
            }
        );
        return deleteResponse;
    }

    async readById(id: string): Promise<IDiary | null> {
        const data = await this.dataSource.readById<IDiary>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async readByField(filter: IFilterOpts): Promise<IDiary[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<IDiary>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<IDiary>> {
        const data = await this.dataSource.read<IFilter, IDiary>(this.source, {
            take: take,
            skip: skip,
        });
        return data;
    }
}
