import mongoose from "mongoose";
import { MetaPropertiesSchema } from "./Commons";
const { Schema } = mongoose;

const DiarySchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    userUID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "DiaryNote" }],
    ...MetaPropertiesSchema.obj,
});

export const DiarySchemaModel = mongoose.model("User", DiarySchema);
