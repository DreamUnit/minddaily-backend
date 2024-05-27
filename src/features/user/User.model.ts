import { AbstractModel } from "../common/AbstractModel.model";
import {
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User,
    UserFilterOpts,
} from "../../__generated__/types";
import { IRepository } from "../common/common.types";

export class UserModel extends AbstractModel<
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User
> {
    constructor(
        userRepository: IRepository<
            Partial<User>,
            Partial<User>,
            UserFilterOpts,
            User
        >
    ) {
        super(userRepository);
    }
}
