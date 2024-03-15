import {
    IReadOpts,
    IWriteOpts,
    IUpdateOpts,
    IDeleteOpts,
} from "./types/DataSource";

export interface IDataSource {
    connect(): void;
    close(): void;
    // must change this, we cannot do it this way.
    write<T, R>(source: string, schema: any, opts: IWriteOpts<T>): Promise<R>;
    read<Filter, Sort, R>(
        source: string,
        opts: IReadOpts<Filter, Sort>
    ): Promise<R[]>;
    readById<R>(source: string, id: string | number): Promise<R>;
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
