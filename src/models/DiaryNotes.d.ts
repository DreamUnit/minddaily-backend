import { IImage, IMetaProperties } from "./Common";

export interface IDiaryNotes extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    diaryId: string;
    images: IImage[];
}
