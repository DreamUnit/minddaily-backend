import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import {
    ICreateDiaryRequest,
    IDiary,
    IUpdateDiaryRequest,
} from "./diary.types";
import { DiarySchemaModel } from "./Diary.schema";
import { IFilter } from "./diary.types";
import { IFilterOpts } from "../common/common.types";
import { AbstractModel } from "../common/AbstractModel.model";
import { DateTime } from "luxon";

export class DiaryModel extends AbstractModel<
    ICreateDiaryRequest,
    IUpdateDiaryRequest,
    IDiary
> {
    private readonly source: string = "diaries";
    private readonly model = DiarySchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create(inputData: ICreateDiaryRequest): Promise<IDiary> {
        const data = await this.dataSource.write<ICreateDiaryRequest, IDiary>(
            this.source,
            this.model,
            {
                data: {
                    ...inputData,
                },
            }
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async update(
        id: string | number,
        updatedData: IUpdateDiaryRequest
    ): Promise<IDiary> {
        const updatedDataResponse = await this.dataSource.update<
            IUpdateDiaryRequest,
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
