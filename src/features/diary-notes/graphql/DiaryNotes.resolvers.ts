import {
    DeleteResponse,
    MutationCreateDiaryNoteArgs,
    MutationDeleteDiaryNoteArgs,
    MutationResolvers,
    MutationUpdateDiaryNoteArgs,
    QueryReadDiaryNoteByIdArgs,
    QueryReadDiaryNotesArgs,
    QueryResolvers,
    ReadDiaryNoteResponse,
    ReadDiaryNotesResponse,
} from "../../../__generated__/types";
import { AbstractResolver } from "../../common/AbstractResolver.resolvers";
import { DiaryNotesModel } from "../DiaryNotes.model";

export class DiaryNotesResolver extends AbstractResolver {
    constructor(private readonly diaryNotesModel: DiaryNotesModel) {
        super();
    }
    private query: QueryResolvers = {
        readDiaryNotes: async (
            _,
            { take, skip }: QueryReadDiaryNotesArgs
        ): Promise<ReadDiaryNotesResponse> => {
            try {
                const { data, count } = await this.diaryNotesModel.readMany(
                    take,
                    skip
                );
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully read Diary Notes",
                    data,
                    count,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to read Diary Notes",
                    data: null,
                    count: null,
                };
            }
        },

        readDiaryNoteById: async (
            _,
            { id }: QueryReadDiaryNoteByIdArgs
        ): Promise<ReadDiaryNoteResponse> => {
            try {
                const data = await this.diaryNotesModel.readById(id);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully read Diary Notes",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to read Diary Notes",
                    data: null,
                };
            }
        },
    };

    private mutation: MutationResolvers = {
        createDiaryNote: async (
            _,
            { title, text, diaryId }: MutationCreateDiaryNoteArgs
        ): Promise<ReadDiaryNoteResponse> => {
            try {
                const data = await this.diaryNotesModel.create({
                    title: title,
                    text: text,
                    diaryId: diaryId,
                });
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully created Diary Notes",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to create Diary Notes",
                    data: null,
                };
            }
        },

        updateDiaryNote: async (
            _,
            { id, title, text }: MutationUpdateDiaryNoteArgs
        ): Promise<ReadDiaryNoteResponse> => {
            try {
                const data = await this.diaryNotesModel.update(id, {
                    id,
                    title: title,
                    text: text,
                });
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully update Diary Notes",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to update Diary Notes",
                    data: null,
                };
            }
        },

        deleteDiaryNote: async (
            _,
            { id }: MutationDeleteDiaryNoteArgs
        ): Promise<DeleteResponse> => {
            try {
                const data = await this.diaryNotesModel.delete(id);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully deleted Diary Notes",
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to delete Diary Notes",
                };
            }
        },
    };

    public getResolvers() {
        return {
            Query: this.query,
            Mutation: this.mutation,
        };
    }
}
