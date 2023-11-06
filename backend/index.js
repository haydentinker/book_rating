import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import book_router from "./routes/booksRoute.js";
import rating_router from "./routes/reviewRoute.js";
import auth_router from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser())
app.use('/books',book_router);
app.use('/auth',auth_router);
app.use('/rating',rating_router);
mongoose
  .connect(mongoDBURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
