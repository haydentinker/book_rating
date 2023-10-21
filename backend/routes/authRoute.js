import express from "express";
import {SignUp,Login} from "../../backend/controllers/AuthController.js"
import { UserVerification } from "../middlewares/UserVerification.js";

const auth_router=express.Router();

auth_router.post('/signup',SignUp);
auth_router.post('/login',Login);
auth_router.post('/userverification',UserVerification);
export default auth_router;