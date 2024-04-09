import { UsersSchemaModel } from "../schemas/UserSchema.schema";
import { DateTime } from "luxon";
import { IUser } from "../graphql/user.types";
import { AbstractModel, IFilterOpts } from "./common.types";
import { IFilter } from "./diary.types";
import { IDataSource } from "../dataSources/DataSource.datasource";
import { IReadManyAndCountResult } from "../dataSources/DataSource.types";

export class UserModel extends AbstractModel<IUser> {
    private readonly source: string = "users";
    private readonly model = UsersSchemaModel;

    constructor(private dataSource: IDataSource) {
        super();
    }

    async create<Data>(inputData: Data): Promise<IUser> {
        const data = await this.dataSource.write<Data, IUser>(
            this.source,
            this.model,
            {
                data: {
                    createdDate: DateTime.utc(),
                    version: 1,
                    permissions: [],
                    active: true,
                    points: 0,
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
