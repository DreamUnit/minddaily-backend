export interface ICreateDiaryNoteRequest {
    userId: string | number;
    title: string;
    diaryId: string | number;
}

export interface IUpdateDiaryNoteRequest {
    title?: string;
}
