import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import {
    ICreateDiaryNoteRequest,
    IDiaryNote,
    IUpdateDiaryNoteRequest,
} from "./diaryNotes.types";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";
import { DateTime } from "luxon";
import { IFilter } from "./diaryNotes.types";
import { AbstractModel } from "../common/AbstractModel.model";
import { IFilterOpts } from "../common/common.types";

export class DiaryNotesModel extends AbstractModel<
    ICreateDiaryNoteRequest,
    IUpdateDiaryNoteRequest,
    IDiaryNote
> {
    private readonly source: string = "diary_notes";
    private readonly model = DiaryNoteSchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create(inputData: ICreateDiaryNoteRequest): Promise<IDiaryNote> {
        const data = await this.dataSource.write<
            ICreateDiaryNoteRequest,
            IDiaryNote
        >(this.source, this.model, {
            data: {
                ...inputData,
            },
        });

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async update<Data>(
        id: string | number,
        updatedData: Data
    ): Promise<IDiaryNote> {
        const updatedDataResponse = await this.dataSource.update<
            Data,
            {},
            IDiaryNote
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

    async readById(id: string): Promise<IDiaryNote | null> {
        const data = await this.dataSource.readById<IDiaryNote>(
            this.source,
            id
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async readByField(filter: IFilterOpts): Promise<IDiaryNote[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<IDiaryNote>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<IDiaryNote>> {
        let data = await this.dataSource.read<IFilter, IDiaryNote>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );

        return data;
    }

    async readByDiaryId(id: string | number) {
        const data = await this.dataSource.readById<IDiaryNote>(
            this.source,
            id
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }
}
