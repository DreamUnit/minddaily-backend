export interface IReadMany<T> {
    code: number;
    success: boolean;
    message: string;
    data: T[];
    count: number;
}

export interface IRead<T> {
    code: number;
    success: boolean;
    message: string;
    data: T;
}

export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}
