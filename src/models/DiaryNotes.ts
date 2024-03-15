import { IDataSource } from "../dataSources/DataSource";
import { IDiaryNote } from "../graphql/mappers/DiaryNotes";
import { DiaryNoteSchemaModel } from "../schemas/DiaryNoteSchema";
import { IFilterOpts, IModel } from "./types/Common";
import { IFilter, ISort } from "./types/Diary";

export class DiaryNotesModel implements IModel<IDiaryNote> {
    private readonly source: string = "diary_notes";
    private readonly model = DiaryNoteSchemaModel;

    constructor(private dataSource: IDataSource) {}

    async create<Data>(inputData: Data): Promise<IDiaryNote> {
        const data = await this.dataSource.write<Data, IDiaryNote>(
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

    async readByField(filter: IFilterOpts): Promise<IDiaryNote | null> {
        throw new Error("not implemented yet");
    }

    async readMany(take: number, skip: number): Promise<IDiaryNote[] | []> {
        const data = await this.dataSource.read<IFilter, ISort, IDiaryNote>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );
        return data || [];
    }
}
