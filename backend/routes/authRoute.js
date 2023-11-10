import express from "express";
import {SignUp,Login} from "../../backend/controllers/AuthController.js"
const auth_router=express.Router();

auth_router.post('/signup',SignUp);
auth_router.post('/login',Login);
export default auth_router;