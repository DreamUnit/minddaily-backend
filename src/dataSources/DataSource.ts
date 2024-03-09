import {
    IReadOpts,
    IWriteOpts,
    IUpdateOpts,
    IDeleteOpts,
} from "./types/DataSource";

export interface IDataSource {
    connect(): void;
    close(): void;
    read<Filter, Sort, R>(
        source: string,
        opts: IReadOpts<Filter, Sort>
    ): Promise<R[]>;
    readById<R>(source: string, id: string | number): Promise<R>;
    write<T, R>(source: string, opts: IWriteOpts<T>): Promise<R>;
    update<T, Query, R>(
        source: string,
        opts: IUpdateOpts<T, Query>
    ): Promise<R>;
    deleteById(source: string, opts: IDeleteOpts): Promise<boolean>;
    softDelete<R>(source: string, opts: IDeleteOpts): Promise<R>;
}
