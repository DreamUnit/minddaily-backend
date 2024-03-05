import { IDataSource } from "./DataSource";
import {
    IDeleteOpts,
    IReadOpts,
    IUpdateOpts,
    IWriteOpts,
} from "./types/DataSource";
import mongoose from "mongoose";

export class MongodbDataSource implements IDataSource {
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

    public softDelete<R>(table: string, opts: IDeleteOpts): Promise<R> {
        throw new Error("Method not implemented.");
    }
    public read<R>(table: string, opts: IReadOpts): Promise<R> {
        throw new Error("Method not implemented.");
    }
    public readById<R>(id: string | number): Promise<R> {
        throw new Error("Method not implemented.");
    }
    public update<T, R>(table: string, opts: IUpdateOpts<T>): Promise<R> {
        throw new Error("Method not implemented.");
    }

    public write<T, R>(table: string, opts: IWriteOpts<T>): Promise<R> {
        throw new Error("Method not implemented.");
    }

    public delete<R>(table: string, opts: IDeleteOpts): Promise<R> {
        throw new Error("Method not implemented.");
    }
}
