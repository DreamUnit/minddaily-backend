import { IReadManyAndCountResult } from "../../dataSources/types/DataSource";

export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
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
