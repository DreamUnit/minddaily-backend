import { IDataSource } from "./DataSource";
import mongoose from "mongoose";
import {
    IDeleteOpts,
    IReadOpts,
    IUpdateOpts,
    IWriteOpts,
} from "./types/DataSource";

export class MongodbDataSource implements IDataSource {
    private connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString);
            console.log("MongoDB connection successful");
        } catch (err) {
            console.error("MongoDB connection error:", err);
            throw err;
        }
    }

    public async close(): Promise<void> {
        try {
            await mongoose.disconnect();
            console.log("Mongoose connection closed.");
        } catch (err) {
            console.error("Error closing the mongoose connection", err);
            throw err;
        }
    }

    async softDelete<R>(source: string, opts: IDeleteOpts): Promise<R> {
        const model = mongoose.model(source);
        const document = await model
            .findByIdAndUpdate(
                opts.id,
                { deletedAt: new Date() },
                { new: true }
            )
            .exec();
        return document;
    }

    public async read<F, S, R>(
        source: string,
        opts: IReadOpts<F, S>
    ): Promise<R[]> {
        const model = mongoose.model(source);
        const documents = await model
            .find(opts.query, null, { take: opts.take, skip: opts.skip })
            .exec();
        return documents;
    }

    public async readById<R>(source: string, id: string | number): Promise<R> {
        const model = mongoose.model(source);
        const document = await model.findById(id).exec();
        return document;
    }

    public async update<T, R>(
        source: string,
        opts: IUpdateOpts<T>
    ): Promise<R> {
        const model = mongoose.model(source);
        const document = await model
            .findByIdAndUpdate(opts.id, opts.data, { new: true })
            .exec();
        return document;
    }

    public async write<T, R>(source: string, opts: IWriteOpts<T>): Promise<R> {
        const model = mongoose.model(source);
        const document = new model(opts.data);
        await document.save();
        return document;
    }

    public async deleteById<R>(
        source: string,
        opts: IDeleteOpts
    ): Promise<boolean> {
        const model = mongoose.model(source);
        const result = await model.deleteOne({ _id: opts.id }).exec();
        return result.acknowledged;
    }
}
