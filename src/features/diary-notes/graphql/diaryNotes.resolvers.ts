import { DataManager } from "../../../config/dataServices.service";
import {
    DeleteResponse,
    MutationCreateDiaryNoteArgs,
    MutationDeleteDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
    QueryReadDiaryNoteByIdArgs,
    QueryReadDiaryNotesArgs,
    ReadDiaryNoteResponse,
    ReadDiaryNotesResponse,
} from "../../../__generated__/types";

const { diaryNotesModel } = DataManager.getInstance();

export const diaryNotesResolvers = {
    Query: {
        readDiaryNotes: async (
            _,
            { take, skip }: QueryReadDiaryNotesArgs
        ): Promise<ReadDiaryNotesResponse> => {
            try {
                const { data, count } = await diaryNotesModel.readMany(
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
                const data = await diaryNotesModel.readById(id);
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
    },

    Mutation: {
        createDiaryNote: async (
            _,
            { title, text, diaryId }: MutationCreateDiaryNoteArgs
        ): Promise<ReadDiaryNoteResponse> => {
            try {
                const data = await diaryNotesModel.create({
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
                const data = await diaryNotesModel.update(id, {
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
                const data = await diaryNotesModel.delete(id);
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
    },
};
