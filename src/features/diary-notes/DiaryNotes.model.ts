import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";

import { AbstractModel } from "../common/AbstractModel.model";
import {
    DiaryFilterOpts,
    DiaryNote,
    DiaryNoteFilterOpts,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";
import { IRepository } from "../common/common.types";

export class DiaryNotesModel extends AbstractModel<
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
    DiaryNote
> {
    private readonly repository: IRepository<
        Partial<DiaryNote>,
        Partial<DiaryNote>,
        DiaryFilterOpts,
        DiaryNote
    >;
    constructor(
        diaryRepository: IRepository<
            Partial<DiaryNote>,
            Partial<DiaryNote>,
            DiaryNoteFilterOpts,
            DiaryNote
        >
    ) {
        super();
        this.repository = diaryRepository;
    }

    public async create(
        inputData: MutationCreateDiaryNoteArgs
    ): Promise<DiaryNote> {
        const data = await this.repository.create({
            version: 1,
            ...inputData,
        });

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async update(
        id: string,
        updatedData: MutationUpdateDiaryNoteArgs
    ): Promise<DiaryNote> {
        const updatedDataResponse = await this.repository.update(
            id,
            updatedData
        );
        return updatedDataResponse;
    }

    public async delete(id: string): Promise<boolean> {
        const deleteResponse = await this.repository.deleteById(id);
        return deleteResponse;
    }

    public async readById(id: string): Promise<DiaryNote | null> {
        const data = await this.repository.readById(id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async readByField(
        opts: DiaryNoteFilterOpts
    ): Promise<DiaryNote[] | null> {
        const { field, intValue, stringValue } = opts;
        let queryResult = await this.repository.readByField({
            field,
            intValue,
            stringValue,
        });
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    public async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<DiaryNote>> {
        const data = await this.repository.read({
            take,
            skip,
        });
        return data;
    }
}
