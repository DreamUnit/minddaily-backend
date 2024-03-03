import { IMetaProperties } from "./Common";
import { IDiaryNote } from "./DiaryNotes";

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    text: string;
    userUID: string;
    notes: IDiaryNote[];
}
