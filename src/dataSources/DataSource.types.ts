import mongoose, { SortOrder } from "mongoose";

// query needs to be updated here to a generic here.
export interface IReadOpts<Filter> {
    query?: any;
    take: number;
    skip: number;
    sort?: string | { [key: string]: SortOrder | { $meta: "textScore" } };
    filter?: Filter;
    relations?: string[];
    select?: string[] | { [key: string]: 0 | 1 };
}

export interface IReadManyAndCountResult<R> {
    data: R[] | null;
    count: number;
}

/** Write Opts, can be extended with various DB
 * schema types such as a SQL entity if needed.
 */
export interface IWriteOpts<T, MongoModel> {
    source: string;
    data: T;
    schemaModel: mongoose.Model<MongoModel>;
}

export interface IUpdateOpts<T, Query> {
    id: string | number;
    source: string;
    data: Partial<T>;
    query?: Query;
}
export interface IReadByFieldOpts {
    source: string;
    field: string;
    value: string | number;
}

export interface IDeleteOpts<MongoModel> {
    id: string | number;
    source: string;
    schemaModel: mongoose.Model<MongoModel>;
}
