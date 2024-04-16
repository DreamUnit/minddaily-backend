import { IImage, IMetaProperties } from "../common/common.types";
import { DateTime } from "luxon";

export interface IFilter {}

export interface ISort {}

export interface ICreateDiaryNoteRequest {
    createdDate: DateTime;
    version: number;
    title: string;
    text: string;
    diaryId: string | number;
}

export interface IUpdateDiaryNoteRequest {
    diaryId?: string;
    title?: string;
    text?: string;
}

export interface IDiaryNote extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    diaryId: string;
    images: IImage[];
}
