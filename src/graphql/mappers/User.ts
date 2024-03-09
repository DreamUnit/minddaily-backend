import { IMetaProperties } from "./Common";

export interface IUser extends IMetaProperties {
    id: string;
    authUserId: string;
    email: string;
    locale: string;
    permissions: string[];
    active: boolean;
    points: number;
}
