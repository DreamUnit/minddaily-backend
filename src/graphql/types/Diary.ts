export interface ICreateDiaryRequest {
    userId: string | number;
    title: string;
}

export interface IUpdateDiaryRequest {
    title?: string;
}
