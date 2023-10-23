import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
    book_id: String,
    goodreads_book_id: String,
    best_book_id: String,
    work_id: String,
    books_count: String,
    isbn: String,
    isbn13: String,
    authors: String,
    original_publication_year: Number,
    original_title: String,
    title: String,
    language_code: String,
    average_rating: Number,
    ratings_count: Number,
    work_ratings_count: Number,
    work_text_reviews_count: Number,
    ratings_1: Number,
    ratings_2: Number,
    ratings_3: Number,
    ratings_4: Number,
    ratings_5: Number,
    image_url: String,
    small_image_url: String
});
export const Book=mongoose.model('Book',bookSchema);