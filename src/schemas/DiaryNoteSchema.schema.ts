import mongoose from "mongoose";
import { ImageSchema, MetaPropertiesSchema } from "./Common.schema";
const { Schema } = mongoose;

const DiaryNoteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    diaryId: { type: Schema.Types.ObjectId, ref: "diaries", required: true },
    images: [ImageSchema],
    ...MetaPropertiesSchema.obj,
});

export const DiaryNoteSchemaModel = mongoose.model(
    "diary_notes",
    DiaryNoteSchema
);
