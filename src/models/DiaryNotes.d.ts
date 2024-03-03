import { IImage, IMetaProperties } from "./Common";

export interface IDiaryNote extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    diaryId: string;
    images: IImage[];
}
