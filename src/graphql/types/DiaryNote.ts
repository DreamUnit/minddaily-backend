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
