import { IDataSource } from "./DataSource";

import {
    IDeleteOpts,
    IReadOpts,
    IReadManyAndCountResult,
    IUpdateOpts,
    IWriteOpts,
} from "./types/DataSource";
import { ILogger } from "../utils/types/Logger";
import mongoose, { Model } from "mongoose";

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
                { deletedDate: new Date() },
                { new: true }
            )
            .exec();
        return document;
    }

    // Need to fix so it fetches count and considers filters and count
    public async read<Filter, R>(
        source: string,
        opts: IReadOpts<Filter>
    ): Promise<IReadManyAndCountResult<R>> {
        console.log("opts:", opts);
        const model = mongoose.model(source);
        let query = model.find(opts.query);
        const countQuery = model.find(opts.query).merge(query);

        console.log("query:", query);
        if (opts.select) {
            query = query.select(opts.select);
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

        console.log("documents:", documents);
        return { data: documents, count };
    }

    public async readById<R>(source: string, id: string | number): Promise<R> {
        const model = mongoose.model(source);
        const document = await model.findById(id).exec();
        return document;
    }

    public async readByField<R>(
        source: string,
        field: string,
        value: string | number
    ): Promise<R[] | null> {
        console.log("field:", field, "value:", value);
        const model = mongoose.model<R>(source);
        const query = { [field]: value } as mongoose.FilterQuery<R>;
        console.log("query:", query);
        const document = await model.find(query).exec();
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

    public async write<T, R>(
        source: string,
        model: Model<T>,
        opts: IWriteOpts<T>
    ): Promise<R> {
        const document = new model(opts.data);
        await document.save();

        const savedDocument = await model.findById(document._id).exec();
        console.log("Saved doc", savedDocument);
        return savedDocument as R;
    }

    public async deleteById<T>(
        source: string,
        model: Model<T>,
        opts: IDeleteOpts
    ): Promise<boolean> {
        const isValid = mongoose.Types.ObjectId.isValid(opts.id);
        if (!isValid) {
            return false;
        }

        const result = await model.deleteOne({ _id: opts.id }).exec();
        return result.acknowledged && result.deletedCount > 0;
    }
}
