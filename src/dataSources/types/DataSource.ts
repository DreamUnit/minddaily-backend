import { SortOrder } from "mongoose";

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

export interface IWriteOpts<T> {
    data: T;
}

export interface IUpdateOpts<T, Query> {
    id: string | number;
    query?: Query;
    data: Partial<T>;
}

export interface IDeleteOpts {
    id: string | number;
}
