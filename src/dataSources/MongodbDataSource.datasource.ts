import { IDataSource } from "./DataSource.datasource.js";

import { ILogger } from "../utils/Logger.types.js";
import mongoose from "mongoose";
import { IReadOpts, IWriteOpts } from "./DataSource.types.js";

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

    /** probablly need to pass the response from the repositrory */
    public async read<Filter, R>(
        source: string,
        opts: IReadOpts<Filter>
    ): Promise<R> {
        const model = mongoose.model(source);
        let query = model.find(opts.query);
        const countQuery = model.find(opts.query).merge(query);

        if (opts.select) {
            query = query.select(opts.query);
        }
        if (opts.relations) {
            opts.relations.forEach(include => {
                query = query.populate(include);
            });
        }
        if (opts.sort) {
            query = query.sort(opts.sort);
        }
        if (opts.skip !== undefined) {
            query = query.skip(opts.skip);
        }
        if (opts.take !== undefined) {
            query = query.limit(opts.take);
        }
        const documents = await query.exec();
        const count = await countQuery.countDocuments().exec();

        return { data: documents, count } as R;
    }

    public async write<T, MongoModel, R>(
        opts: IWriteOpts<T, MongoModel>
    ): Promise<R> {
        if (opts.delete) {
            const isValid = mongoose.Types.ObjectId.isValid(opts.data["id"]);
            if (!isValid) {
                return false as R;
            }

            const result = await opts.schemaModel
                .deleteOne({ _id: opts.data["id"] })
                .exec();
            return result.acknowledged && ((result.deletedCount > 0) as R);
        }

        if (opts.update) {
            const updatedDocument = await opts.schemaModel
                .findByIdAndUpdate(opts.data["_id"], opts.data, { new: true })
                .exec();

            return updatedDocument as R;
        }
        const document = new opts.schemaModel(opts.data);
        await document.save();

        const savedDocument = await opts.schemaModel
            .findById(document._id)
            .exec();
        return savedDocument as R;
    }
}
