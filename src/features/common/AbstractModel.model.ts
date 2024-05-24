import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { IFilterOpts, IRepository } from "./common.types";

export abstract class AbstractModel<CreateType, UpdateType, ResponseType> {
    protected repository: IRepository<
        Partial<ResponseType>,
        Partial<ResponseType>,
        IFilterOpts,
        ResponseType
    >;

    constructor(
        repository: IRepository<
            Partial<ResponseType>,
            Partial<ResponseType>,
            IFilterOpts,
            ResponseType
        >
    ) {
        this.repository = repository;
    }

    abstract readById(id: string): Promise<ResponseType>;
    abstract readByField(filter: IFilterOpts): Promise<ResponseType[] | null>;
    abstract readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<ResponseType>>;
    async create(inputData: CreateType): Promise<ResponseType> {
        const data = await this.repository.create({
            version: 1,
            ...inputData,
        });

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }
    abstract update(
        id: string | number,
        updatedData: UpdateType
    ): Promise<ResponseType>;
    abstract delete(id: string | number): Promise<boolean>;
}
