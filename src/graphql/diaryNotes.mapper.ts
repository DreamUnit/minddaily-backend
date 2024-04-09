import { IImage, IMetaProperties } from "./common.mapper";

export interface IDiaryNote extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    diaryId: string;
    images: IImage[];
}
