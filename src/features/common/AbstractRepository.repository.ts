import mongoose from "mongoose";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import {
    IReadManyAndCountResult,
    IReadOpts,
    IWriteOpts,
} from "../../dataSources/DataSource.types";

/** Encapsulates CRUD logic for repositories */
abstract class AbstractRepository<
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
    }

    public async create(data: Partial<CreateType>): Promise<ReturnType> {
        const opts: IWriteOpts<Partial<CreateType>, any> = {
            source: this.source,
            schemaModel: this.schemaModel,
            data,
        };
        return this.dataSource.write<Partial<CreateType>, any, ReturnType>(
            opts
        );
    }

    public async update(
        id: string,
        data: Partial<UpdateType>
    ): Promise<ReturnType> {
        const opts: IWriteOpts<Partial<UpdateType>, any> = {
            source: this.source,
            schemaModel: this.schemaModel,
            update: true,
            data: {
                _id: id,
                ...data,
            },
        };
        return this.dataSource.write<Partial<UpdateType>, any, ReturnType>(
            opts
        );
    }

    public async deleteById(id: string): Promise<boolean> {
        const opts: IWriteOpts<{ id: string }, any> = {
            source: this.source,
            delete: true,
            data: { id },
            schemaModel: this.schemaModel,
        };
        return this.dataSource.write<{ id: string }, any, boolean>(opts);
    }

    public async readById(id: string): Promise<ReturnType | null> {
        const opts: IReadOpts<Partial<FilterType>> = {
            query: { _id: id },
            take: 1,
            skip: 0,
        };
        const result = await this.dataSource.read<
            Partial<FilterType>,
            IReadManyAndCountResult<ReturnType>
        >(this.source, opts);
        return result.data ? result.data[0] : null;
    }

    // setup resolver
    public async readByField(
        filter: Partial<FilterType>
    ): Promise<ReturnType[]> {
        const opts: IReadOpts<Partial<FilterType>> = {
            query: filter,
            take: 20, // need to change this make it dynamic or something
            skip: 0,
        };
        const result = await this.dataSource.read<
            Partial<FilterType>,
            IReadManyAndCountResult<ReturnType>
        >(this.source, opts);
        return result.data || [];
    }

    public async read(
        opts: IReadOpts<FilterType>
    ): Promise<IReadManyAndCountResult<ReturnType>> {
        return await this.dataSource.read<
            FilterType,
            IReadManyAndCountResult<ReturnType>
        >(this.source, opts);
    }
}

export default AbstractRepository;
