import mongoose from "mongoose";
import { DiaryNote, DiaryNoteFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import {
    IReadManyAndCountResult,
    IReadOpts,
} from "../../dataSources/DataSource.types";
import { IRepository } from "../common/common.types";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";

export class DiaryNoteRepository
    implements
        IRepository<
            Partial<DiaryNote>,
            Partial<DiaryNote>,
            DiaryNoteFilterOpts,
            DiaryNote
        >
{
    public readonly source = "diary_notes";
    public readonly schemaModel: mongoose.Model<any>;

    constructor(private dataSource: IDataSource) {
        const datasourceType = process.env.DATABASE_TYPE;
        switch (datasourceType) {
            case "mongodb":
                this.schemaModel = DiaryNoteSchemaModel;
                break;
            case "sql":
                throw new Error("Not implemented yet");
            default:
                break;
        }
    }

    public async create(diary: Partial<DiaryNote>): Promise<DiaryNote> {
        return this.dataSource.write<Partial<DiaryNote>, any, DiaryNote>({
            source: this.source,
            schemaModel: this.schemaModel,
            data: diary,
        });
    }

    public async update(
        id: string,
        diary: Partial<DiaryNote>
    ): Promise<DiaryNote> {
        return this.dataSource.update<Partial<DiaryNote>, any, DiaryNote>({
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

    public async readById(id: string): Promise<DiaryNote | null> {
        return this.dataSource.readById<DiaryNote>("DiaryNote", id);
    }

    public async readByField(
        filter: Partial<DiaryNoteFilterOpts>
    ): Promise<DiaryNote[]> {
        return this.dataSource.readByField<DiaryNote>({
            source: this.source,
            field: filter.field,
            value: filter.intValue || filter.stringValue,
        });
    }

    public async read(
        opts: IReadOpts<DiaryNoteFilterOpts>
    ): Promise<IReadManyAndCountResult<DiaryNote>> {
        return await this.dataSource.read<DiaryNoteFilterOpts, DiaryNote>(
            this.source,
            opts
        );
    }
}
