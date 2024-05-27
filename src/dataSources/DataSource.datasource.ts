import { IWriteOpts, IReadOpts } from "./DataSource.types";

export interface IDataSource {
    connect(): void;
    close(): void;
    write<T, MongoModel, R>(opts: IWriteOpts<T, MongoModel>): Promise<R>;
    read<Filter, R>(source: string, opts: IReadOpts<Filter>): Promise<R>;
}
