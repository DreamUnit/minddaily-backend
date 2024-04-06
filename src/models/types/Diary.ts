import { DateTime } from "luxon";

export interface IFilter {}

export interface ISort {}

export interface ICreateDiaryRequest {
    createdDate: DateTime;
    version: number;
    userId: string | number;
    title: string;
}

export interface IUpdateDiaryRequest {
    userId?: string;
    title?: string;
}
