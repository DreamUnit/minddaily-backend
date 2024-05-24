import {
    DeleteResponse,
    MutationCreateUserArgs,
    MutationDeleteUserArgs,
    MutationResolvers,
    MutationUpdateUserArgs,
    QueryReadUserByIdArgs,
    QueryReadUsersArgs,
    QueryResolvers,
    ReadUserResponse,
    ReadUsersResponse,
    UserResolvers,
} from "../../../__generated__/types";
import { UserModel } from "../User.model";
import { Logger } from "../../../utils/Logger.util";
import { AbstractResolver } from "../../common/AbstractResolver.resolvers";
import { DiaryModel } from "../../diary/Diary.model";

export class UserResolver extends AbstractResolver {
    private readonly userModel: UserModel;
    private readonly diaryModel: DiaryModel;
    private readonly logger: Logger;

    constructor(userModel: UserModel, diaryModel: DiaryModel, logger: Logger) {
        super();
        this.userModel = userModel;
        this.diaryModel = diaryModel;
        this.logger = logger;
    }

    private query: QueryResolvers = {
        readUsers: async (
            _,
            { take, skip }: QueryReadUsersArgs
        ): Promise<ReadUsersResponse> => {
            try {
                const data = await this.userModel.readMany(take, skip);
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
                const data = await this.userModel.readById(id);
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
    };

    private mutation: MutationResolvers = {
        createUser: async (
            _,
            { authUserId, name, email, locale }: MutationCreateUserArgs
        ): Promise<ReadUserResponse> => {
            try {
                const data = await this.userModel.create({
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
                const data = await this.userModel.update(id, {
                    id,
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
                const data = await this.userModel.delete(id);
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
    };

    private user: UserResolvers = {
        diaries: async parent => {
            try {
                const diaries = await this.diaryModel.readByField({
                    field: "userId",
                    stringValue: parent.id,
                });
                return diaries;
            } catch (err) {
                this.logger.error("Error fetching diaries :", err);
            }
        },
    };

    public getResolvers() {
        return {
            Query: this.query,
            Mutation: this.mutation,
            User: this.user,
        };
    }
}
