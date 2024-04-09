import { DateTime } from "luxon";

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
