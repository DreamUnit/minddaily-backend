import {
    IDelete,
    IPagination,
    IRead,
    IReadMany,
} from "../../common/common.types";
import { DateTime } from "luxon";
import { IDiaryNote } from "../diaryNotes.types";
import {
    ICreateDiaryNoteRequest,
    IUpdateDiaryNoteRequest,
} from "../diaryNotes.types";
import { diaryNotesModel } from "../../../config/dataServices.service";

export const diaryNotesResolvers = {
    Query: {
        readDiaryNotes: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IDiaryNote>> => {
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
            { title, text, diaryId }
        ): Promise<IRead<IDiaryNote>> => {
            try {
                const data = await diaryNotesModel.create({
                    createdDate: DateTime.utc(),
                    version: 1,
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
            { id, title, text }
        ): Promise<IRead<IDiaryNote>> => {
            try {
                const data =
                    await diaryNotesModel.update<IUpdateDiaryNoteRequest>(id, {
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

        deleteDiaryNote: async (_, { id }): Promise<IDelete> => {
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
