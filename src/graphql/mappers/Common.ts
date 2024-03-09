import { DateTime } from "luxon";

export interface IMetaProperties {
    createdDate: DateTime;
    updatedDate?: DateTime;
    deletedDate?: DateTime;
    version: number;
}

export interface IImage {
    url: string;
    title: string;
}
