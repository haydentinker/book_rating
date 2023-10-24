import { User } from "../models/UserModel.js";
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from 'bcrypt';


export async function SignUp (request,response,next){
    try{
        const {email,password,username,createdAt}=request.body
        const existingUser= await User.findOne({email});
        if (existingUser){
            return response.json({message:"user already exists"})
        }
        const user= await User.create({email,password,username,createdAt});
        const token =createSecretToken(user._id);
        response
            .status(201)
            .json({message:"User signed up successfully",success:true,token:token})
        next();
    }catch(error){
        console.error(error);
    }
}

export async function Login (request,response,next){
    try{
        const {email,password}=request.body;
        if(!email || !password){
            return response.json({message:"All fields are required"});
        }
        const user=await User.findOne({email});
        if (!user){
            return response.json({message:"Could not find user with that email"});
        }
        const auth =await bcrypt.compare(password,user.password);
        if(!auth){
            return response.json({message:"Invalid password or email"});
        }
        const token=createSecretToken(user._id);
        response.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })
        response.status(201).json({message:"User logged in successfully", success:true})
        next()
    }catch(error){
        console.error(error)
    }
}
