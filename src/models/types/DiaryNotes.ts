import { DateTime } from "luxon";

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
