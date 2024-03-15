// query needs to be updated here to a generic here.
export interface IReadOpts<Filter, Sort> {
    query?: any;
    take: number;
    skip: number;
    sort?: Filter;
    filter?: Sort;
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
