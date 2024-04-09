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
    // must change this, we cannot do it this way.
    write<T, R>(source: string, schema: any, opts: IWriteOpts<T>): Promise<R>;
    read<Filter, R>(
        source: string,
        opts: IReadOpts<Filter>
    ): Promise<IReadManyAndCountResult<R>>;
    readById<R>(source: string, id: string | number): Promise<R>;
    readByField<R>(
        source: string,
        field: string,
        value: string | number
    ): Promise<R[] | null>;
    update<T, Query, R>(
        source: string,
        opts: IUpdateOpts<T, Query>
    ): Promise<R>;
    // must change this, we cannot do it this way.
    deleteById(
        source: string,
        schema: any,
        opts: IDeleteOpts
    ): Promise<boolean>;
    softDelete<R>(source: string, opts: IDeleteOpts): Promise<R>;
}
