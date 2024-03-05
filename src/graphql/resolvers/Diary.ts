import { IReadMany } from "../../models/Common";
import { IDiary } from "../mappers/Diary";
import { IPagination } from "../types/common";
import { diaryModel, logger } from "../..";

export const diaryResolvers = {
    Query: {
        fetchDiaries: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IDiary>> => {
            try {
                const data = await diaryModel.fetchMany(take, skip);
                return data;
            } catch (err) {
                logger.error("Failed to fetch Diaries");
            }
        },
    },
};
