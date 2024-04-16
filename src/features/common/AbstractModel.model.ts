import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { IFilterOpts } from "./common.types";

export abstract class AbstractModel<CreateType, UpdateType, ResponseType> {
    abstract readById(id: string): Promise<ResponseType>;
    abstract readByField(filter: IFilterOpts): Promise<ResponseType[] | null>;
    abstract readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<ResponseType>>;
    abstract create(data: CreateType): Promise<ResponseType>;
    abstract update(
        id: string | number,
        updatedData: UpdateType
    ): Promise<ResponseType>;
    abstract delete(id: string | number): Promise<boolean>;
}
