import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";

import { AbstractModel } from "../common/AbstractModel.model";
import {
    DiaryFilterOpts,
    DiaryNote,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";

export class DiaryNotesModel extends AbstractModel<
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
    DiaryNote
> {
    private readonly source: string = "diary_notes";
    private readonly model = DiaryNoteSchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    public async create(
        inputData: MutationCreateDiaryNoteArgs
    ): Promise<DiaryNote> {
        const data = await this.dataSource.write<Partial<DiaryNote>, DiaryNote>(
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

    public async update(
        id: string | number,
        updatedData: MutationUpdateDiaryNoteArgs
    ): Promise<DiaryNote> {
        const updatedDataResponse = await this.dataSource.update<
            DiaryNote,
            {},
            DiaryNote
        >(this.source, {
            id: id,
            data: updatedData,
        });
        return updatedDataResponse;
    }

    public async delete(id: string | number): Promise<boolean> {
        const deleteResponse = await this.dataSource.deleteById(
            this.source,
            this.model,
            {
                id: id,
            }
        );
        return deleteResponse;
    }

    public async readById(id: string): Promise<DiaryNote | null> {
        const data = await this.dataSource.readById<DiaryNote>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async readByField(
        filter: DiaryFilterOpts
    ): Promise<DiaryNote[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<DiaryNote>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    public async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<DiaryNote>> {
        let data = await this.dataSource.read<DiaryFilterOpts, DiaryNote>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );

        return data;
    }
}
