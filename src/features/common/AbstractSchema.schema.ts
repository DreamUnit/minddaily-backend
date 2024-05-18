import mongoose from "mongoose";
const { Schema } = mongoose;

export const MetaPropertiesSchema = new Schema({
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, required: true, default: null },
    deletedDate: { type: Date, require: true, default: null },
    version: { type: Number, required: true },
});
