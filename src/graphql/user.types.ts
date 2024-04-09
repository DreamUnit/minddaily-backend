import { IMetaProperties } from "./common.types";

export interface ICreateUserRequest {
    authUserId: string;
    name: string;
    email: string;
    locale: string;
}

export interface IUpdateUserRequest {
    authUserId?: string;
    name?: string;
    email?: string;
    locale?: string;
    points?: number;
    active?: boolean;
    permissions: string[];
}

export interface IUser extends IMetaProperties {
    id: string;
    authUserId: string;
    name: string;
    email: string;
    locale: string;
    permissions: string[];
    active: boolean;
    points: number;
}
