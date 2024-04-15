import { UsersSchemaModel } from "./User.schema";
import { DateTime } from "luxon";
import { ICreateUserRequest, IUpdateUserRequest, IUser } from "./user.types";
import { IFilter } from "./user.types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { AbstractModel } from "../common/AbstractModel.model";
import { IFilterOpts } from "../common/common.types";

export class UserModel extends AbstractModel<
    ICreateUserRequest,
    IUpdateUserRequest,
    IUser
> {
    private readonly source: string = "users";
    private readonly model = UsersSchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create(inputData: ICreateUserRequest): Promise<IUser> {
        const data = await this.dataSource.write<ICreateUserRequest, IUser>(
            this.source,
            this.model,
            {
                data: {
                    ...inputData,
                },
            }
        );

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async update<Data>(id: string | number, updatedData: Data): Promise<IUser> {
        const updatedDate = DateTime.utc();

        const updatedDataResponse = await this.dataSource.update<
            Data,
            {},
            IUser
        >(this.source, {
            id: id,
            data: { ...updatedData, updatedDate },
        });
        return updatedDataResponse;
    }

    async delete(id: string | number): Promise<boolean> {
        const deleteResponse = await this.dataSource.deleteById(
            this.source,
            this.model,
            {
                id: id,
            }
        );
        return deleteResponse;
    }

    async readById(id: string): Promise<IUser | null> {
        const data = await this.dataSource.readById<IUser>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async readByField(filter: IFilterOpts): Promise<IUser[] | null> {
        const value = filter.stringValue || filter.intValue;
        let queryResult = await this.dataSource.readByField<IUser>(
            this.source,
            filter.field,
            value
        );
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<IUser>> {
        const data = await this.dataSource.read<IFilter, IUser>(this.source, {
            take: take,
            skip: skip,
        });
        return data;
    }
}
