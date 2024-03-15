import { IDiary } from "../mappers/Diary";
import { IDelete, IPagination, IRead, IReadMany } from "../types/common";
import { diaryModel } from "../..";
import { DateTime } from "luxon";
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
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to read Diaries",
                    data: null,
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
                    notes: [],
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

        updateDiary: async (_, { userId, title }): Promise<IRead<IDiary>> => {
            try {
                // type the input.
                const data = await diaryModel.create({
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
};
