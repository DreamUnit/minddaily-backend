import {
    IReadManyAndCountResult,
    IReadOpts,
} from "../../dataSources/DataSource.types";

export interface IFilterOpts {
    field: string;
    stringValue?: string;
    intValue?: number;
}

export interface IRepository<CreateType, UpdateType, FilterType, ReturnType> {
    create(data: CreateType): Promise<ReturnType>;
    update(id: string, data: UpdateType): Promise<ReturnType>;
    deleteById(id: string): Promise<boolean>;
    readById(id: string): Promise<ReturnType | null>;
    readByField(filter: FilterType): Promise<ReturnType[]>;
    read(
        opts: IReadOpts<IFilterOpts>
    ): Promise<IReadManyAndCountResult<ReturnType>>;
}
