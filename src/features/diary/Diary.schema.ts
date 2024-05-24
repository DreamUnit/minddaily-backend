import mongoose, { Schema, Types } from "mongoose";
import { MetaPropertiesSchema } from "../common/AbstractSchema.schema";

const DiarySchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "users", required: true },
    ...MetaPropertiesSchema.obj,
});

export const DiarySchemaModel = mongoose.model("diaries", DiarySchema);
