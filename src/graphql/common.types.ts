import { DateTime } from "luxon";

export interface IPagination {
    take: number;
    skip: number;
}

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

export interface IDelete {
    code: number;
    success: boolean;
    message: string;
}

export interface IMetaProperties {
    createdDate: DateTime;
    updatedDate?: DateTime;
    deletedDate?: DateTime;
    version: number;
}

export interface IImage {
    url: string;
    title: string;
}
