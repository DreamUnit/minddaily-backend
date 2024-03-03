import { IMetaProperties } from "./Common";
import { IDiaryNotes } from "./DiaryNotes";

export interface DiaryModel extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    userUID: string;
    notes: IDiaryNotes[];
}
