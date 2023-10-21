import express from "express";
import SignUp from "../controllers/AuthController"
const auth_router=express.Router();

auth_router.post('/signup',SignUp);

export default auth_router;