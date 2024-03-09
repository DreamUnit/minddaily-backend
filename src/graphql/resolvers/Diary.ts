import { IDiary } from "../mappers/Diary";
import { IPagination, IReadMany } from "../types/common";
import { diaryModel } from "../..";

export const diaryResolvers = {
    Query: {
        fetchDiaries: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IDiary>> => {
            try {
                const data = await diaryModel.fetchMany(take, skip);
                return {
                    code: 200,
                    success: true,
                    message: "Succesfully fetched Diaries",
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Failed to fetch Diaries",
                    data: null,
                };
            }
        },
    },
};
