import mongoose from "mongoose";
const { Schema } = mongoose;

export const MetaPropertiesSchema = new Schema(
    {
        createdDate: { type: Date, required: true, default: Date.now },
        updatedDate: { type: Date },
        deletedDate: { type: Date },
        version: { type: Number, required: true },
    },
    { _id: false }
);