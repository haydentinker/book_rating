import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import book_router from "./routes/booksRoute.js";
import cors from 'cors';
const app = express();
app.use(cors())
// app.use(cors({
//     origin:'http://localhost:5173',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));
app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("HELLO");
});
app.use('/books',book_router)
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
