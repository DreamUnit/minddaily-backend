import {
    diaryModel,
    diaryNotesModel,
    logger,
} from "../../../config/dataServices.service";
import {
    DeleteResponse,
    MutationCreateDiaryArgs,
    MutationDeleteDiaryArgs,
    MutationUpdateDiaryArgs,
    QueryReadDiariesArgs,
    QueryReadDiaryByIdArgs,
    ReadDiariesResponse,
    ReadDiaryResponse,
} from "../../../__generated__/types";

export const diaryResolvers = {
    Query: {
        readDiaries: async (
            _,
            { take, skip }: QueryReadDiariesArgs
        ): Promise<ReadDiariesResponse> => {
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

        readDiaryById: async (
            _,
            { id }: QueryReadDiaryByIdArgs
        ): Promise<ReadDiaryResponse> => {
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
        createDiary: async (
            _,
            { userId, title }: MutationCreateDiaryArgs
        ): Promise<ReadDiaryResponse> => {
            try {
                const data = await diaryModel.create({
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
                const data = await diaryModel.update(id, {
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
