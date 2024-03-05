import {
    IReadOpts,
    IWriteOpts,
    IUpdateOpts,
    IDeleteOpts,
} from "./types/DataSource";

/**
 * Interface defining the contract for a data source handling generic data operations.
 * This includes basic CRUD operations along with connection management.
 *
 * @template T The type of the entity to be written or updated in the data source.
 * @template R The type of the response returned by the data source operations.
 */
export interface IDataSource {
    connect(): void;
    close(): void;
    read<R>(table: string, opts: IReadOpts): Promise<R>;
    readById<R>(id: string | number): Promise<R>;
    write<T, R>(table: string, opts: IWriteOpts<T>): Promise<R>;
    update<T, R>(table: string, opts: IUpdateOpts<T>): Promise<R>;
    delete<R>(table: string, opts: IDeleteOpts): Promise<R>;
    softDelete<R>(table: string, opts: IDeleteOpts): Promise<R>;
}
