import { UsersSchemaModel } from "./User.schema";
import { DateTime } from "luxon";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
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
    private readonly repository: IRepository<
        Partial<User>,
        Partial<User>,
        UserFilterOpts,
        User
    >;
    constructor(
        userRepository: IRepository<
            Partial<User>,
            Partial<User>,
            UserFilterOpts,
            User
        >
    ) {
        super();
        this.repository = userRepository;
    }

    public async create(inputData: MutationCreateUserArgs): Promise<User> {
        const data = await this.repository.create({
            createdDate: DateTime.utc(),
            updatedDate: null,
            version: 1,
            permissions: [],
            active: true,
            points: 0,
            locale: `en-gb`,
            ...inputData,
        });

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async update(
        id: string,
        updatedData: MutationUpdateUserArgs
    ): Promise<User> {
        const updatedDataResponse = await this.repository.update(
            id,
            updatedData
        );
        return updatedDataResponse;
    }

    public async delete(id: string): Promise<boolean> {
        const deleteResponse = await this.repository.deleteById(id);
        return deleteResponse;
    }

    public async readById(id: string): Promise<User | null> {
        const data = await this.repository.readById(id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async readByField(opts: UserFilterOpts): Promise<User[] | null> {
        const { field, intValue, stringValue } = opts;
        let queryResult = await this.repository.readByField({
            field,
            intValue,
            stringValue,
        });
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    public async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<User>> {
        const data = await this.repository.read({
            take,
            skip,
        });
        return data;
    }
}
