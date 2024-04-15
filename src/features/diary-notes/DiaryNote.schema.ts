import mongoose from "mongoose";
import { MetaPropertiesSchema } from "../common/AbstractSchema.schema";
const { Schema } = mongoose;

export const ImageSchema = new Schema({
    diaryNoteId: {
        type: Schema.Types.ObjectId,
        ref: "diary_notes",
        required: true,
    },
    url: { type: String, required: true },
    title: { type: String, required: true },
});

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
