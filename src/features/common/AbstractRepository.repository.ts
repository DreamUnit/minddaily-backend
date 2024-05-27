import mongoose from "mongoose";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import {
    IReadManyAndCountResult,
    IReadOpts,
} from "../../dataSources/DataSource.types";

/** Encapsulates CRUD logic for repositories */
abstract class AbstractRespository<
    CreateType,
    UpdateType,
    FilterType,
    ReturnType
> {
    public readonly schemaModel: mongoose.Model<any>;
    public readonly source: string;

    constructor(
        private dataSource: IDataSource,
        source: string,
        schemaModel: mongoose.Model<any>
    ) {
        this.source = source;
        this.schemaModel = schemaModel;
        const datasourceType = process.env.DATABASE_TYPE;
        switch (datasourceType) {
            case "mongodb":
                this.schemaModel = schemaModel;
                break;
            case "sql":
                throw new Error("Not implemented yet");
            default:
                break;
        }
    }

    public async create(data: Partial<CreateType>): Promise<ReturnType> {
        return this.dataSource.write<Partial<CreateType>, any, ReturnType>({
            source: this.source,
            schemaModel: this.schemaModel,
            data,
        });
    }

    public async update(
        id: string,
        data: Partial<UpdateType>
    ): Promise<ReturnType> {
        return this.dataSource.update<Partial<UpdateType>, any, ReturnType>({
            source: this.source,
            id,
            data,
        });
    }

    public async deleteById(id: string): Promise<boolean> {
        return this.dataSource.deleteById({
            source: this.source,
            id,
            schemaModel: this.schemaModel,
        });
    }

    public async readById(id: string): Promise<ReturnType | null> {
        return this.dataSource.readById<ReturnType>(this.source, id);
    }

    public async readByField(
        filter: Partial<FilterType>
    ): Promise<ReturnType[]> {
        return this.dataSource.readByField<ReturnType>({
            source: this.source,
            query: filter,
        });
    }

    public async read(
        opts: IReadOpts<FilterType>
    ): Promise<IReadManyAndCountResult<ReturnType>> {
        return await this.dataSource.read<FilterType, ReturnType>(
            this.source,
            opts
        );
    }
}

export default AbstractRespository;
