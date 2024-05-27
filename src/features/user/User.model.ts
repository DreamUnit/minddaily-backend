import { AbstractModel } from "../common/AbstractModel.model";
import {
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User,
} from "../../__generated__/types";
import { UserRepository } from "./User.repository";

export class UserModel extends AbstractModel<
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User
> {
    constructor(userRepository: UserRepository) {
        super(userRepository);
    }
}
