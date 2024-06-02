import {
    DeleteResponse,
    DiaryNote,
    DiaryResolvers,
    MutationCreateDiaryArgs,
    MutationDeleteDiaryArgs,
    MutationResolvers,
    MutationUpdateDiaryArgs,
    QueryReadDiariesArgs,
    QueryReadDiaryByIdArgs,
    QueryResolvers,
    ReadDiariesResponse,
    ReadDiaryResponse,
} from "../../../__generated__/types";
import { DiaryModel } from "../Diary.model";
import { AbstractResolver } from "../../common/AbstractResolver.resolvers";
import { DiaryNotesModel } from "../../diary-notes/DiaryNotes.model";
import { Logger } from "../../../utils/Logger.util";
import DataLoader from "dataloader";

export class DiaryResolver extends AbstractResolver {
    private readonly DiaryNoteLoader: DataLoader<string, DiaryNote[]> =
        new DataLoader(ids => this.getNotesByDiaryIds(ids));

    constructor(
        private readonly diaryModel: DiaryModel,
        private readonly diaryNotesModel: DiaryNotesModel,
        private readonly logger: Logger
    ) {
        super();
    }
    private query: QueryResolvers = {
        readDiaries: async (
            _,
            { take, skip }: QueryReadDiariesArgs
        ): Promise<ReadDiariesResponse> => {
            try {
                const data = await this.diaryModel.readMany(take, skip);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully read Diaries",
                    data: data.data,
                    count: data.count,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to read Diaries",
                    data: null,
                    count: 0,
                };
            }
        },

        readDiaryById: async (
            _,
            { id }: QueryReadDiaryByIdArgs
        ): Promise<ReadDiaryResponse> => {
            try {
                const data = await this.diaryModel.readById(id);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully read Diary",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to read Diary",
                    data: null,
                };
            }
        },
    };

    private mutation: MutationResolvers = {
        createDiary: async (
            _,
            { userId, title }: MutationCreateDiaryArgs
        ): Promise<ReadDiaryResponse> => {
            try {
                const data = await this.diaryModel.create({
                    userId,
                    title,
                });

                return {
                    code: 200,
                    success: true,
                    message: "Succesfully created Diary",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to create Diary with error of: ${err}`,
                    data: null,
                };
            }
        },

        updateDiary: async (
            _,
            { id, userId, title }: MutationUpdateDiaryArgs
        ): Promise<ReadDiaryResponse> => {
            try {
                const data = await this.diaryModel.update(id, {
                    id,
                    userId,
                    title,
                });
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully created Diary",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to update Diary",
                    data: null,
                };
            }
        },

        deleteDiary: async (
            _,
            { id }: MutationDeleteDiaryArgs
        ): Promise<DeleteResponse> => {
            try {
                const data = await this.diaryModel.delete(id);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully deleted Diary",
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to delete Diary",
                };
            }
        },
    };

    private diary: DiaryResolvers = {
        notes: async parent => {
            try {
                const notes = this.DiaryNoteLoader.load(parent.id);
                return notes;
            } catch (err) {
                this.logger.error("Error fetching diaries :", err);
            }
        },
    };

    private async getNotesByDiaryIds(
        ids: readonly string[]
    ): Promise<DiaryNote[][]> {
        const mappedNotes = ids.map(id => {
            return this.diaryNotesModel.readByField({
                field: "diaryId",
                stringValue: id as string,
            });
        });
        const notes = await Promise.all(mappedNotes);
        return notes;
    }

    public getResolvers() {
        return {
            Query: this.query,
            Mutation: this.mutation,
            Diary: this.diary,
        };
    }
}
