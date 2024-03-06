export interface IReadOpts<F, S> {
    query?: any;
    take?: number;
    skip?: number;
    sort?: F;
    filter?: S;
}

export interface IWriteOpts<T> {
    data: T;
}

export interface IUpdateOpts<T> {
    id?: string | number;
    query?: any;
    data: Partial<T>;
}

export interface IDeleteOpts {
    id?: string | number;
    query?: any;
}
