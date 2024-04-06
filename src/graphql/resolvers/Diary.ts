import { IDiary } from "../mappers/Diary";
import { IDelete, IPagination, IRead, IReadMany } from "../types/common";

import { DateTime } from "luxon";
import { IUpdateDiaryRequest } from "../types/Diary";
import { diaryModel, diaryNotesModel, logger } from "../../config/dataServices";
export const diaryResolvers = {
    Query: {
        readDiaries: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IDiary>> => {
            try {
                const data = await diaryModel.readMany(take, skip);
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

        readDiaryById: async (_, { id }): Promise<IRead<IDiary>> => {
            try {
                const data = await diaryModel.readById(id);
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
    },

    Mutation: {
        createDiary: async (_, { userId, title }): Promise<IRead<IDiary>> => {
            try {
                // type the input.
                const data = await diaryModel.create({
                    createdDate: DateTime.utc(),
                    version: 1,
                    userId: userId,
                    title: title,
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
            { id, userId, title }
        ): Promise<IRead<IDiary>> => {
            try {
                const data = await diaryModel.update<IUpdateDiaryRequest>(id, {
                    userId: userId,
                    title: title,
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

        deleteDiary: async (_, { id }): Promise<IDelete> => {
            try {
                // type the input.
                const data = await diaryModel.delete(id);
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
    },
    Diary: {
        notes: async parent => {
            try {
                const diaryNotes = await diaryNotesModel.readByField({
                    field: "diaryId",
                    stringValue: parent.id,
                });
                return diaryNotes;
            } catch (err) {
                logger.error("Error fetching diary notes:", err);
            }
        },
    },
};
