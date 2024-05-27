import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
import { IFilterOpts, IRepository } from "./common.types";

/** Encapsulated CRUD logic for models */
export abstract class AbstractModel<CreateType, UpdateType, ResponseType> {
    protected repository: IRepository<
        CreateType,
        UpdateType,
        IFilterOpts,
        ResponseType
    >;

    constructor(
        repository: IRepository<
            CreateType,
            UpdateType,
            IFilterOpts,
            ResponseType
        >
    ) {
        this.repository = repository;
    }

    public async readById(id: string): Promise<ResponseType> {
        const data = await this.repository.readById(id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async readByField(
        opts: IFilterOpts
    ): Promise<ResponseType[] | null> {
        const { field, intValue, stringValue } = opts;
        let queryResult = await this.repository.readByField({
            field,
            intValue,
            stringValue,
        });
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }
    public async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<ResponseType>> {
        const data = await this.repository.read({
            take,
            skip,
        });
        return data;
    }

    public async create(inputData: CreateType): Promise<ResponseType> {
        const createData = {
            version: 1,
            ...inputData,
        };
        const data = await this.repository.create(createData);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    public async update(
        id: string,
        updatedData: UpdateType
    ): Promise<ResponseType> {
        const updatedDataResponse = await this.repository.update(
            id,
            updatedData
        );
        return updatedDataResponse;
    }
    public async delete(id: string): Promise<boolean> {
        const deleteResponse = await this.repository.deleteById(id);
        return deleteResponse;
    }
}
