import { IMetaProperties } from "./Common";
import { IDiaryNote } from "./DiaryNotes";

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    userId: string;
    notes: IDiaryNote[];
}
