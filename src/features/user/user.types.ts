import { IMetaProperties } from "../common/common.types";
import { DateTime } from "luxon";
export interface IFilter {}

export interface ISort {}

export interface ICreateUserRequest {
    createdDate: DateTime;
    version: number;
    authUserId: string;
    permissions: string[];
    active: boolean;
    points: number;
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
