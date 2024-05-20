import mongoose from "mongoose";
import { User, UserFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { UsersSchemaModel } from "./User.schema";
import {
    IReadManyAndCountResult,
    IReadOpts,
} from "../../dataSources/DataSource.types";
import { IRepository } from "../common/common.types";

export class UserRepository
    implements IRepository<Partial<User>, Partial<User>, UserFilterOpts, User>
{
    public readonly source = "users";
    public readonly schemaModel: mongoose.Model<any>;

    constructor(private dataSource: IDataSource) {
        const datasourceType = process.env.DATABASE_TYPE;
        switch (datasourceType) {
            case "mongodb":
                this.schemaModel = UsersSchemaModel;
                break;
            case "sql":
                throw new Error("Not implemented yet");
            default:
                break;
        }
    }

    public async create(user: Partial<User>): Promise<User> {
        return await this.dataSource.write<Partial<User>, any, User>({
            source: this.source,
            schemaModel: this.schemaModel,
            data: user,
        });
    }

    public async update(id: string, user: Partial<User>): Promise<User> {
        return await this.dataSource.update<Partial<User>, any, User>({
            source: this.source,
            id,
            data: user,
        });
    }

    public async deleteById(id: string): Promise<boolean> {
        return await this.dataSource.deleteById({
            source: this.source,
            id,
            schemaModel: this.schemaModel,
        });
    }

    public async readById(id: string): Promise<User | null> {
        return this.dataSource.readById<User>("users", id);
    }

    public async readByField(filter: Partial<UserFilterOpts>): Promise<User[]> {
        return await this.dataSource.readByField<User>({
            source: this.source,
            query: filter,
        });
    }

    public async read(
        opts: IReadOpts<UserFilterOpts>
    ): Promise<IReadManyAndCountResult<User>> {
        return await this.dataSource.read<UserFilterOpts, User>(
            this.source,
            opts
        );
    }
}
