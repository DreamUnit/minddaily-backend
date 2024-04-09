import { IMetaProperties } from "./common.mapper";
import { IDiaryNote } from "./diaryNotes.mapper";

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    userId: string;
    notes: IDiaryNote[];
}
