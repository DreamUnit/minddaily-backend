export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}

export interface IModel<T> {
    readById(id: string): Promise<T>;
    readByField(filter: IFilterOpts): Promise<T>;
    readMany(take: number, skip: number): Promise<T[]>;
    create<Data>(data: Data): Promise<T>;
    update<Data>(id: string | number, updatedData: Data): Promise<T>;
    delete(id: string | number): Promise<boolean>;
}
