import { User } from "../models/UserModel";
import { createSecretToken } from "../util/SecretToken";
import bcrypt from 'bcrypt.js';


export const SignUp=async(request,response,next)=>{
    try{
        const {email,password,createdAt}=request.body
        const existingUser= await User.findOne({email});
        if (existingUser){
            return response.json({message:"user already exists"})
        }
        const user= await User.create({email,password,createdAt});
        const token =createSecretToken(user._id);
        response.cookie("token",token,{
            withCredentials:true,
            httpOnly:false,
        })
        response
            .status(201)
            .json({message:"User signed up successfully",success:true,user})
        next();
    }catch(error){
        console.error(error);
    }
}