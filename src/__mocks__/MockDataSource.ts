import {
    IWriteOpts,
    IReadOpts,
    IUpdateOpts,
    IDeleteOpts,
} from "../dataSources/DataSource.types";

export class MockDataSource {
    connect = jest.fn();
    close = jest.fn();

    write = jest.fn<any, any>(
        (source: string, schema: any, opts: IWriteOpts<any>) =>
            Promise.resolve(opts.data)
    );
    read = jest.fn<any, any>((source: string, opts: IReadOpts<any>) =>
        Promise.resolve({
            data: [opts.filter],
            count: 1,
        })
    );
    readById = jest.fn<any, any>((source: string, id: string | number) =>
        Promise.resolve({ id })
    );
    readByField = jest.fn<any, any>(
        (source: string, field: string, value: string | number) =>
            Promise.resolve([{ [field]: value }])
    );
    update = jest.fn<any, any>((source: string, opts: IUpdateOpts<any, any>) =>
        Promise.resolve(opts.data)
    );
    deleteById = jest.fn<any, any>(
        (source: string, schema: any, opts: IDeleteOpts) =>
            Promise.resolve(true)
    );
    softDelete = jest.fn<any, any>((source: string, opts: IDeleteOpts) =>
        Promise.resolve({ id: "softDeleted" })
    );
}
