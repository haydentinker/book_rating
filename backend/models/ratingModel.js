import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const ratingSchema = mongoose.Schema({
    user_id:ObjectId,
    book_id:ObjectId,
    rating:Number
})


export const Rating= mongoose.model('Rating',ratingSchema);