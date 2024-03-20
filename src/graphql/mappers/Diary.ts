import { IMetaProperties } from "./Common";

export interface IDiary extends IMetaProperties {
    id: string;
    title: string;
    userId: string;
    notes: number[];
}
