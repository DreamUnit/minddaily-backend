import { IDataSource } from "./DataSource.datasource.js";

import { ILogger } from "../utils/Logger.types.js";
import mongoose from "mongoose";
import {
    IDeleteOpts,
    IReadOpts,
    IReadManyAndCountResult,
    IUpdateOpts,
    IWriteOpts,
    IReadByFieldOpts,
} from "./DataSource.types.js";

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

    async softDelete<R, MongoModel>(opts: IDeleteOpts<MongoModel>): Promise<R> {
        const model = mongoose.model(opts.source);
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
        const model = mongoose.model(source);
        let query = model.find(opts.query);
        const countQuery = model.find(opts.query).merge(query);

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

        return { data: documents, count };
    }

    public async readById<R>(source: string, id: string | number): Promise<R> {
        const model = mongoose.model(source);
        const document = await model.findById(id).exec();
        return document;
    }

    public async readByField<R>(opts: IReadByFieldOpts): Promise<R[] | null> {
        const { source, field, value } = opts;
        const model = mongoose.model<R>(source);
        const query = { [field]: value } as mongoose.FilterQuery<R>;
        const document = await model.find(query).exec();
        return document;
    }

    public async update<T, Query, R>(opts: IUpdateOpts<T, Query>): Promise<R> {
        const model = mongoose.model(opts.source);

        const updateData = {
            ...opts.data,
            $currentDate: { updatedDate: true },
        };

        const document = await model
            .findByIdAndUpdate(opts.id, updateData, { new: true })
            .exec();

        return document;
    }

    public async write<T, MongoModel, R>(
        opts: IWriteOpts<T, MongoModel>
    ): Promise<R> {
        const document = new opts.schemaModel(opts.data);
        await document.save();

        const savedDocument = await opts.schemaModel
            .findById(document._id)
            .exec();
        return savedDocument as R;
    }

    public async deleteById<T, MongoModel>(
        opts: IDeleteOpts<MongoModel>
    ): Promise<boolean> {
        const isValid = mongoose.Types.ObjectId.isValid(opts.id);
        if (!isValid) {
            return false;
        }

        const result = await opts.schemaModel
            .deleteOne({ _id: opts.id })
            .exec();
        return result.acknowledged && result.deletedCount > 0;
    }
}
