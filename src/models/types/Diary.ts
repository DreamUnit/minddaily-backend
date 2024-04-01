export interface IFilter {}

export interface ISort {}

export interface ICreateDiaryRequest {
    userId: string | number;
    title: string;
}

export interface IUpdateDiaryRequest {
    userId?: string;
    title?: string;
}
