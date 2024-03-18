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
}
