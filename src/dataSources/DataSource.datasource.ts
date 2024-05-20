import {
    IWriteOpts,
    IReadOpts,
    IReadManyAndCountResult,
    IUpdateOpts,
    IDeleteOpts,
} from "./DataSource.types";

export interface IDataSource {
    connect(): void;
    close(): void;
    write<T, MongoModel, R>(opts: IWriteOpts<T, MongoModel>): Promise<R>;
    read<Filter, R>(
        source: string,
        opts: IReadOpts<Filter>
    ): Promise<IReadManyAndCountResult<R>>;
    readById<R>(source: string, id: string | number): Promise<R>;
    readByField<R>(IReadByFieldOpts): Promise<R[] | null>;
    update<T, Query, R>(opts: IUpdateOpts<T, Query>): Promise<R>;
    deleteById<MongoModel>(opts: IDeleteOpts<MongoModel>): Promise<boolean>;
    softDelete<R, MongoModel>(opts: IDeleteOpts<MongoModel>): Promise<R>;
}
