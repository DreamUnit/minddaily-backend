import { IReadManyAndCountResult } from "../../dataSources/types/DataSource";

export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}

//Probably should be an abstract class rather than an interface to implement.
export interface IModel<T> {
    readById(id: string): Promise<T>;
    readByField(filter: IFilterOpts): Promise<T[] | null>;
    readMany(take: number, skip: number): Promise<IReadManyAndCountResult<T>>;
    create<Data>(data: Data): Promise<T>;
    update<Data>(id: string | number, updatedData: Data): Promise<T>;
    delete(id: string | number): Promise<boolean>;
}

export abstract class AbstractModel<T> {
    abstract readById(id: string): Promise<T>;
    abstract readByField(filter: IFilterOpts): Promise<T[] | null>;
    abstract readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<T>>;
    abstract create<Data>(data: Data): Promise<T>;
    abstract update<Data>(id: string | number, updatedData: Data): Promise<T>;
    abstract delete(id: string | number): Promise<boolean>;
}
