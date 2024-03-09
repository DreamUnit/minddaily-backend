import { IDataSource } from "./DataSource";
import mongoose from "mongoose";
import {
    IDeleteOpts,
    IReadOpts,
    IUpdateOpts,
    IWriteOpts,
} from "./types/DataSource";
import { ILogger } from "../utils/types/Logger";

export class MongodbDataSource implements IDataSource {
    private connectionString: string;
    private logger: ILogger;

    constructor(connectionString: string, logger: ILogger) {
        this.connectionString = connectionString;
        this.logger = logger;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString);
            this.logger.info("MongoDB connection successful");
        } catch (err) {
            this.logger.error("MongoDB connection error:", err);
            throw err;
        }
    }

    public async close(): Promise<void> {
        try {
            await mongoose.disconnect();
            this.logger.info("Mongoose connection closed.");
        } catch (err) {
            this.logger.error("Error closing the mongoose connection", err);
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

    public async read<Filter, Sort, R>(
        source: string,
        opts: IReadOpts<Filter, Sort>
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

    public async update<T, Query, R>(
        source: string,
        opts: IUpdateOpts<T, Query>
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

    public async deleteById(
        source: string,
        opts: IDeleteOpts
    ): Promise<boolean> {
        const model = mongoose.model(source);
        const result = await model.deleteOne({ _id: opts.id }).exec();
        return result.acknowledged;
    }
}
