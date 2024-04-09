import { IImage, IMetaProperties } from "./common.types";

export interface ICreateDiaryNoteRequest {
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
