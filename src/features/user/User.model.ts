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

export class UserModel extends AbstractModel<
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User
> {
    private readonly source: string = "users";
    private readonly model = UsersSchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    public async create(inputData: MutationCreateUserArgs): Promise<User> {
        const data = await this.dataSource.write<Partial<User>, User>(
            this.source,
            this.model,
            {
                data: {
                    createdDate: DateTime.utc(),
                    updatedDate: null,
                    version: 1,
                    permissions: [],
                    active: true,
                    points: 0,
                    locale: `en-gb`,
                    ...inputData,
                },
            }
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async update(
        id: number | string,
        updatedData: MutationUpdateUserArgs
    ): Promise<User> {
        const updatedDataResponse = await this.dataSource.update<
            User,
            {},
            User
        >(this.source, {
            id: id,
            data: { ...updatedData },
        });
        return updatedDataResponse;
    }

    public async delete(id: string | number): Promise<boolean> {
        const deleteResponse = await this.dataSource.deleteById(
            this.source,
            this.model,
            {
                id: id,
            }
        );
        return deleteResponse;
    }

    public async readById(id: string | number): Promise<User | null> {
        const data = await this.dataSource.readById<User>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async readByField(filter: UserFilterOpts): Promise<User[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<User>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    public async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<User>> {
        const data = await this.dataSource.read<UserFilterOpts, User>(
            this.source,
            {
                take: take,
                skip: skip,
            }
        );
        return data;
    }
}
