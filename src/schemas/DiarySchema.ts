import mongoose from "mongoose";
import { MetaPropertiesSchema } from "./Commons";
const { Schema } = mongoose;

const DiarySchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    ...MetaPropertiesSchema.obj,
});

export const DiarySchemaModel = mongoose.model("diaries", DiarySchema);
