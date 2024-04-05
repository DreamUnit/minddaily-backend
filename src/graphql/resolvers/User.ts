import { IDelete, IPagination, IRead, IReadMany } from "../types/common";

import { IUser } from "../mappers/User";
import { ICreateUserRequest, IUpdateUserRequest } from "../types/User";
import { userModel, diaryModel, logger } from "../../config/dataServices";

export const userResolvers = {
    Query: {
        readUsers: async (
            _,
            { take, skip }: IPagination
        ): Promise<IReadMany<IUser>> => {
            try {
                const data = await userModel.readMany(take, skip);
                return {
                    code: 200,
                    success: true,
                    message: `Succesfully read Users`,
                    data: data.data,
                    count: data.count,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to read Users with an error of: ${err}`,
                    data: null,
                    count: null,
                };
            }
        },

        readUserById: async (_, { id }): Promise<IRead<IUser>> => {
            try {
                const data = await userModel.readById(id);
                return {
                    code: 200,
                    success: true,
                    message: `Succesfully read User`,
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to read User with an error of: ${err}`,
                    data: null,
                };
            }
        },
    },

    Mutation: {
        createUser: async (
            _,
            { authUserId, name, email }
        ): Promise<IRead<IUser>> => {
            try {
                const data = await userModel.create<ICreateUserRequest>({
                    authUserId: authUserId,
                    name: name,
                    email: email,
                    locale: `en-gb`,
                });

                return {
                    code: 200,
                    success: true,
                    message: `Succesfully created User`,
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to create User with an error of: ${err}`,
                    data: null,
                };
            }
        },

        updateUser: async (
            _,
            { id, name, email, active, points, locale, permissions }
        ): Promise<IRead<IUser>> => {
            try {
                const data = await userModel.update<IUpdateUserRequest>(id, {
                    name: name,
                    email: email,
                    active: active,
                    points: points,
                    locale: locale,
                    permissions: permissions,
                });
                return {
                    code: 200,
                    success: true,
                    message: `Succesfully updated User`,
                    data,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to update User with an error of: ${err}`,
                    data: null,
                };
            }
        },

        deleteUser: async (_, { id }): Promise<IDelete> => {
            try {
                const data = await userModel.delete(id);
                return {
                    code: 200,
                    success: true,
                    message: `Succesfully deleted User`,
                };
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Failed to delete User with an error of: ${err}`,
                };
            }
        },
    },
    User: {
        diaries: async parent => {
            try {
                const diaries = await diaryModel.readByField({
                    field: "userId",
                    stringValue: parent.id,
                });
                return diaries;
            } catch (err) {
                logger.error("Error fetching diaries :", err);
            }
        },
    },
};
