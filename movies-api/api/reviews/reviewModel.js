import mongoose from "mongoose";

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    Movie: {type: String},
    description: String, required: true,
    rating: int,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

export default mongoose.model("Reviews", ReviewSchema);