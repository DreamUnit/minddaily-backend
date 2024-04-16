export class MongodbDataSource {
    constructor(connectionString: string, logger: any) {}
    connect = jest.fn().mockResolvedValue(undefined);
    close = jest.fn().mockResolvedValue(undefined);
    read = jest.fn().mockResolvedValue({
        data: [
            {
                id: "123example",
            },
        ],
        count: 1,
    });
    readById = jest.fn().mockResolvedValue({ id: "123example" });
    readByField = jest.fn().mockResolvedValue([{ id: "123example" }]);
    update = jest.fn().mockResolvedValue({ id: "123example" });
    write = jest.fn().mockResolvedValue({ id: "123example" });
    deleteById = jest.fn().mockResolvedValue(true);
    softDelete = jest.fn((source: string, opts: any) =>
        Promise.resolve({ id: "123example" })
    );
}
