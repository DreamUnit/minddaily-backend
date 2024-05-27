import { User, UserFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { UsersSchemaModel } from "./User.schema";
import AbstractRespository from "../common/AbstractRepository.repository";

export class UserRepository extends AbstractRespository<
    User,
    User,
    UserFilterOpts,
    User
> {
    constructor(dataSource: IDataSource) {
        super(dataSource, "users", UsersSchemaModel);
    }
}
