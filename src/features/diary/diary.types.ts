import { IMetaProperties } from "../common/common.types";
import { IDiaryNote } from "../diary-notes/diaryNotes.types";
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

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    userId: string;
    notes: IDiaryNote[];
}
