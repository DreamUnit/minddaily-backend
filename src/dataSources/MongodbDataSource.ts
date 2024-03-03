import { AbstractDataSource } from "./AbstractDataSource";
import {
    IDeleteOpts,
    IReadOpts,
    IUpdateOpts,
    IWriteOpts,
} from "./types/AbstractDataSource";
import mongoose from "mongoose";

// TODO change from any to actual types.
export class MongodbDataSource implements AbstractDataSource<any, any> {
    private connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public async connect() {
        try {
            await mongoose.connect(this.connectionString);

            console.log("successful connection");
        } catch (err) {
            console.log(err);
        }
    }

    public async close(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Mongoose connection closed.");
        } catch (err) {
            console.error("Error closing the mongoose connection", err);
        }
    }

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
