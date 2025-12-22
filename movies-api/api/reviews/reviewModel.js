// import mongoose from "mongoose";

// const Schema = mongoose.Schema

// const ReviewSchema = new Schema({
//     movieId: {type: Number, required: true},
//     description: {type: String, required: true},
//     rating: {type: Number, min:0, max:10},
//     created_at: {type: Date, default: Date.now},
//     updated_at: {type: Date, default: Date.now},
//     userId:{
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required:true
//     },
// });

// export default mongoose.model("Review", ReviewSchema);