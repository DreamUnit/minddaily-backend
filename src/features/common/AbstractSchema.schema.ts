import mongoose from "mongoose";
const { Schema } = mongoose;

export const MetaPropertiesSchema = new Schema({
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
    deletedDate: { type: Date, default: null },
    version: { type: Number, required: true },
});
