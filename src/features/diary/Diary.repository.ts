import mongoose from "mongoose";
import { Diary, DiaryFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { DiarySchemaModel } from "./Diary.schema";
import {
    IReadManyAndCountResult,
    IReadOpts,
} from "../../dataSources/DataSource.types";
import { IRepository } from "../common/common.types";

export class DiaryRepository
    implements
        IRepository<Partial<Diary>, Partial<Diary>, DiaryFilterOpts, Diary>
{
    public readonly source = "diaries";
    public readonly schemaModel: mongoose.Model<any>;

    constructor(private dataSource: IDataSource) {
        const datasourceType = process.env.DATABASE_TYPE;
        switch (datasourceType) {
            case "mongodb":
                this.schemaModel = DiarySchemaModel;
                break;
            case "sql":
                throw new Error("Not implemented yet");
            default:
                break;
        }
    }

    public async create(diary: Partial<Diary>): Promise<Diary> {
        return this.dataSource.write<Partial<Diary>, any, Diary>({
            source: this.source,
            schemaModel: this.schemaModel,
            data: diary,
        });
    }

    public async update(id: string, diary: Partial<Diary>): Promise<Diary> {
        return this.dataSource.update<Partial<Diary>, any, Diary>({
            source: this.source,
            id,
            data: diary,
        });
    }

    public async deleteById(id: string): Promise<boolean> {
        return this.dataSource.deleteById({
            source: this.source,
            id,
            schemaModel: this.schemaModel,
        });
    }

    public async readById(id: string): Promise<Diary | null> {
        return this.dataSource.readById<Diary>(this.source, id);
    }

    public async readByField(
        filter: Partial<DiaryFilterOpts>
    ): Promise<Diary[]> {
        return this.dataSource.readByField<Diary>({
            source: this.source,
            field: filter.field,
            value: filter.intValue || filter.stringValue,
        });
    }

    public async read(
        opts: IReadOpts<DiaryFilterOpts>
    ): Promise<IReadManyAndCountResult<Diary>> {
        return await this.dataSource.read<DiaryFilterOpts, Diary>(
            this.source,
            opts
        );
    }
}
