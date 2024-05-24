import {
    IReadOpts,
    IReadManyAndCountResult,
} from "../dataSources/DataSource.types";
import { IRepository, IFilterOpts } from "../features/common/common.types";
import { MockDataSource } from "./MockDataSource";

export class MockRepository implements IRepository<any, any, IFilterOpts, any> {
    constructor(private dataSource: MockDataSource) {}

    create = jest.fn((data: any): Promise<any> => {
        return this.dataSource.write("source", {}, { data });
    });

    update = jest.fn((id: string, data: any): Promise<any> => {
        return this.dataSource.update("source", { id, data });
    });

    deleteById = jest.fn((id: string): Promise<boolean> => {
        return this.dataSource.deleteById("source", {}, { id });
    });

    readById = jest.fn((id: string): Promise<any | null> => {
        return this.dataSource.readById("source", id);
    });

    readByField = jest.fn((filter: IFilterOpts): Promise<any[]> => {
        return this.dataSource.readByField(
            "source",
            Object.keys(filter)[0],
            filter[Object.keys(filter)[0]]
        );
    });

    read = jest.fn(
        (
            opts: IReadOpts<IFilterOpts>
        ): Promise<IReadManyAndCountResult<any>> => {
            return this.dataSource.read("source", opts);
        }
    );
}
