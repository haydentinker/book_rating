import express from "express";
import { Rating } from "../models/ratingModel.js";
import Book  from "../models/bookModel.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
const rating_router=express.Router();
rating_router.use(AuthMiddleware)

rating_router.get('book/:id',async(request,response)=>{
    try{
        
        const {id}=request.params;
        const book=await Book.findById(id);
        const BookId=book.book_id
        const rating=await Rating.find({book_id:{$eq:BookId},user_id:{$eq:request.user._id}})
        return response.status(200).send(rating)
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
rating_router.put('/:id',async(request,response)=>{
    try{
        if (
            !request.body.rating
          ) {
            return response
              .status(400)
              .send({
                message: "Send all required fields: rating",
              });
            }
        const {id}=request.params;
        const result= await Rating.findById(id);
        if(!result){
            return response
              .status(400)
              .send({
                message: error.message,
              });
        }
        if (result.user_id===request.user._id){
            await Rating.findByIdAndUpdate(id,{
                book_id:result.book_id,
                user_id:request.user._id,
                rating:request.body.rating
            })
            return response.status(200).send({message:"Successfully updated rating"})
        }
        else{
            return response.status(401).send({message:"user is not authorized to modify this rating!"})
        }
        
        
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
rating_router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const result= await Rating.findById(id);
        if(!result){
            return response
              .status(400)
              .send({
                message: error.message,
              });
        }
        if (result.user_id===request.user._id){
            await Rating.delete(id)
            return response.status(204).send({message:"Successfully deleted rating"})
        }
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
rating_router.post("/", async (request, response) => {
  try {
    if (
      !request.body.rating ||
      !request.body.book_id
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: book_id and rating",
        });
    }
    const newRating={
        user_id:request.user._id,
        book_id:request.body.book_id,
        rating:request.body.rating
    }
    const rating=await Rating.create(newRating)
    return response.status(200).send('Rating created');
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default rating_router;