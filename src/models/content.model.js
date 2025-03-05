import mongoose from "mongoose";
import { Schema } from "mongoose";

const contentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true 
    }
);

export const Content = mongoose.model("Content", contentSchema);
