export interface IReadOpts {
    filter?: Record<string, any>;
    limit?: number;
    sort?: Record<string, "asc" | "desc">;
}

export interface IWriteOpts<T> {
    id: string | number;
    request: T;
}

export interface IUpdateOpts<T> {
    id: string | number;
    request: T;
}

export interface IDeleteOpts {
    id: string | number;
}
