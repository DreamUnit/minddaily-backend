import { AbstractDataSource } from "./AbstractDataSource";
import {
    IDeleteOpts,
    IReadOpts,
    IUpdateOpts,
    IWriteOpts,
} from "./types/AbstractDataSource";

// TODO
export class MongodbDataSource implements AbstractDataSource<any, any> {
    public softDelete(table: string, opts: IDeleteOpts): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public read(table: string, opts: IReadOpts): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public readById(id: string | number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public update(table: string, opts: IUpdateOpts<any>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public write(table: string, opts: IWriteOpts<any>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public delete(table: string, opts: IDeleteOpts): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
