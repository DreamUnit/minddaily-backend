import { DateTime } from "luxon";
import { IMetaProperties } from "./common.types";
import { IDiaryNote } from "./diaryNotes.types";

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

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    userId: string;
    notes: IDiaryNote[];
}
