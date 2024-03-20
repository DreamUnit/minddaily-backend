export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}

//Probably should be an abstract class rather than an interface to implement.
export interface IModel<T> {
    readById(id: string): Promise<T>;
    readByField(filter: IFilterOpts): Promise<T[] | null>;
    readMany(take: number, skip: number): Promise<T[]>;
    create<Data>(data: Data): Promise<T>;
    update<Data>(id: string | number, updatedData: Data): Promise<T>;
    delete(id: string | number): Promise<boolean>;
}
