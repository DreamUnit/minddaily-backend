export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}

export interface IModel<T> {
    fetchById(id: string): Promise<T>;
    fetchByField(filter: IFilterOpts): Promise<T>;
    fetchMany(take: number, skip: number): Promise<T[]>;
}
