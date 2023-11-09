import express from "express";
import { Rating } from "../models/ratingModel.js";
import Book from "../models/bookModel.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
const rating_router = express.Router();
rating_router.use(AuthMiddleware)

rating_router.get('/book/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    const BookId = book._id;
    const rating = await Rating.findOne({
      book_id: BookId,
      user_id: request.user._id
    });
    console.log(BookId)
    if (!rating) {
      return response.status(404).send({ message: 'Rating not found', rating: null });
    }
    return response.status(200).send({ message: 'Rating found', rating });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
rating_router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.rating
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: rating",
        });
    }
    const { id } = request.params;
    const result = await Rating.findById(id);
    if (!result) {
      return response
        .status(400)
        .send({
          message: error.message,
        });
    }
    if (result.user_id === request.user._id) {
      await Rating.findByIdAndUpdate(id, {
        book_id: result.book_id,
        user_id: request.user._id,
        rating: request.body.rating
      })
      return response.status(200).send({ message: "Successfully updated rating" })
    }
    else {
      return response.status(401).send({ message: "user is not authorized to modify this rating!" })
    }


  }
  catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
rating_router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Rating.findById(id);
    if (!result) {
      return response
        .status(400)
        .send({
          message: error.message,
        });
    }
    if (result.user_id === request.user._id) {
      await Rating.delete(id)
      return response.status(204).send({ message: "Successfully deleted rating" })
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
})
rating_router.post("/", async (request, response) => {
  console.log(request.body.book_id)
  console.log(request.body.rating)
  try {
    if (!request.body.rating || !request.body.book_id) {
      return response.status(400).send({
        message: "Send all required fields: book_id and rating",
      });
    }

    const user_id = request.user._id;
    const book_id = request.body.book_id;

    // Check if the user has already reviewed the book
    const existingRating = await Rating.findOne({ user_id, book_id });

    if (existingRating) {
      return response.status(400).send({
        message: "You have already reviewed this book.",
      });
    }

    const newRating = {
      user_id: user_id,
      book_id: book_id,
      rating: request.body.rating,
    };

    const rating = await Rating.create(newRating);

    return response.status(200).send({ message: 'Rating created', rating_id: rating._id });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default rating_router;