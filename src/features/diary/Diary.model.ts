import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { DiarySchemaModel } from "./Diary.schema";
import { AbstractModel } from "../common/AbstractModel.model";
import {
    Diary,
    DiaryFilterOpts,
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
} from "../../__generated__/types";

export class DiaryModel extends AbstractModel<
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
    Diary
> {
    private readonly source: string = "diaries";
    private readonly model = DiarySchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create(inputData: MutationCreateDiaryArgs): Promise<Diary> {
        const data = await this.dataSource.write<Partial<Diary>, Diary>(
            this.source,
            this.model,
            {
                data: {
                    version: 1,
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
        updatedData: MutationUpdateDiaryArgs
    ): Promise<Diary> {
        const updatedDataResponse = await this.dataSource.update<
            Diary,
            {},
            Diary
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

    async readById(id: string): Promise<Diary | null> {
        const data = await this.dataSource.readById<Diary>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async readByField(filter: DiaryFilterOpts): Promise<Diary[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<Diary>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<Diary>> {
        const data = await this.dataSource.read<DiaryFilterOpts, Diary>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );
        return data;
    }
}
