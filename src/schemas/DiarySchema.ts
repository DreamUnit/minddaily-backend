import mongoose from "mongoose";
import { MetaPropertiesSchema } from "./Commons";
const { Schema } = mongoose;

const DiarySchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    // notes: [{ type: Schema.Types.ObjectId, ref: "diary_notes" }], // possibly don't even need this as resolver will handle getting the data from the correct collection.

    ...MetaPropertiesSchema.obj,
});

export const DiarySchemaModel = mongoose.model("diaries", DiarySchema);
