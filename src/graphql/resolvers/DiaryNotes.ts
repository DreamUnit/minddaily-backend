import { IDelete, IPagination, IRead, IReadMany } from "../types/common";
import { diaryNotesModel } from "../..";
import { IDiaryNote } from "../mappers/DiaryNotes";

export const diaryNotesResolvers = {
    Query: {
        readDiaryNotes: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IDiaryNote>> => {
            try {
                const data = await diaryNotesModel.readMany(take, skip);
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

        readDiaryNoteById: async (_, { id }): Promise<IRead<IDiaryNote>> => {
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
            { userId, title }
        ): Promise<IRead<IDiaryNote>> => {
            try {
                // type the input.
                const data = await diaryNotesModel.create({
                    userId: userId,
                    title: title,
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
            { userId, title }
        ): Promise<IRead<IDiaryNote>> => {
            try {
                // type the input.
                const data = await diaryNotesModel.create({
                    userId: userId,
                    title: title,
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

        deleteDiaryNote: async (_, { id }): Promise<IDelete> => {
            try {
                // type the input.
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
