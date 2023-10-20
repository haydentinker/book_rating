import express from "express";
import { Book } from "../models/bookModel.js";
const book_router=express.Router();

book_router.get('/',async(request,response)=>{
    try{
        const books=await Book.find({});
        return response.status(200).send({
            count:books.length,
            data:books
        })
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
      }
})
book_router.get('/:id',async(request,response)=>{
    try{
        
        const {id}=request.params;
        const book=await Book.findById(id);
        return response.status(200).send(book)
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
book_router.put('/:id',async(request,response)=>{
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response
              .status(400)
              .send({
                message: "Send all required fields: title, author ,publishYear",
              });
            }
        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response
              .status(400)
              .send({
                message: error.message,
              });
        }
        return response.status(200).send({message:"Successfully updated book"})
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});
book_router.delete('/:id',async(request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result){
            return response
              .status(400)
              .send({
                message: error.message,
              });
        }
        return response.status(204).send({message:"Book deleted "})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})
book_router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: title, author ,publishYear",
        });
    }
    const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear
    }
    const book=await Book.create(newBook)
    return response.status(200).send('Book created');
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default book_router;