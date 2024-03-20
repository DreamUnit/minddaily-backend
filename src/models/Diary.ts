import { isArray } from "@apollo/client/utilities";
import { IDataSource } from "../dataSources/DataSource";
import { IDiary } from "../graphql/mappers/Diary";
import { DiarySchemaModel } from "../schemas/DiarySchema";
import { IFilterOpts, IModel } from "./types/Common";
import { IFilter, ISort } from "./types/Diary";

export class DiaryModel implements IModel<IDiary> {
    private readonly source: string = "diaries";
    private readonly model = DiarySchemaModel;

    constructor(private dataSource: IDataSource) {}

    async create<Data>(inputData: Data): Promise<IDiary> {
        console.log("Create Diary:", inputData);
        const data = await this.dataSource.write<Data, IDiary>(
            this.source,
            this.model,
            {
                data: inputData,
            }
        );
        console.log("data Diary:", data);

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
        return isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(take: number, skip: number): Promise<IDiary[] | []> {
        const data = await this.dataSource.read<IFilter, IDiary>(this.source, {
            take: take,
            skip: skip,
        });
        return data || [];
    }
}
