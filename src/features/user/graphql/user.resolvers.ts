import { DateTime } from "luxon";
import { IUpdateUserRequest } from "../user.types";
import {
    userModel,
    diaryModel,
    logger,
} from "../../../config/dataServices.service";
import {
    DeleteResponse,
    MutationCreateUserArgs,
    MutationDeleteUserArgs,
    MutationUpdateUserArgs,
    QueryReadUserByIdArgs,
    QueryReadUsersArgs,
    ReadUserResponse,
    ReadUsersResponse,
} from "../../../__generated__/types";

export const userResolvers = {
    Query: {
        readUsers: async (
            _,
            { take, skip }: QueryReadUsersArgs
        ): Promise<ReadUsersResponse> => {
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

        readUserById: async (
            _,
            { id }: QueryReadUserByIdArgs
        ): Promise<ReadUserResponse> => {
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
            { authUserId, name, email, locale }: MutationCreateUserArgs
        ): Promise<ReadUserResponse> => {
            try {
                const data = await userModel.create({
                    authUserId: authUserId,
                    name: name,
                    email: email,
                    locale,
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
            {
                id,
                name,
                email,
                active,
                points,
                locale,
                permissions,
            }: MutationUpdateUserArgs
        ): Promise<ReadUserResponse> => {
            try {
                const data = await userModel.update(id, {
                    name,
                    email,
                    active,
                    points,
                    locale,
                    permissions,
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

        deleteUser: async (
            _,
            { id }: MutationDeleteUserArgs
        ): Promise<DeleteResponse> => {
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
