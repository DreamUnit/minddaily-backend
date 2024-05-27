import mongoose from "mongoose";
import { MetaPropertiesSchema } from "../common/AbstractSchema.schema";
const { Schema } = mongoose;

export const UserSchema = new Schema({
    authUserId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    locale: { type: String, required: true },
    permissions: [{ type: String }],
    active: { type: Boolean, required: false, default: true },
    points: { type: Number, required: false, default: 0 },
    ...MetaPropertiesSchema.obj,
});

export const UsersSchemaModel = mongoose.model("users", UserSchema);
