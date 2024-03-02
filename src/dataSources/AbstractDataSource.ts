import {
    IReadOpts,
    IWriteOpts,
    IUpdateOpts,
    IDeleteOpts,
} from "./types/AbstractDataSource";

export abstract class AbstractDataSource<T, R> {
    public abstract read(table: string, opts: IReadOpts): Promise<R>;
    public abstract readById(id: string | number): Promise<R>;
    public abstract write(table: string, opts: IWriteOpts<T>): Promise<R>;
    public abstract update(table: string, opts: IUpdateOpts<T>): Promise<R>;
    public abstract delete(table: string, opts: IDeleteOpts): Promise<R>;
    public abstract softDelete(table: string, opts: IDeleteOpts): Promise<R>;
}
