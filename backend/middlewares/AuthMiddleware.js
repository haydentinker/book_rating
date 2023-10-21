import { User } from "../models/UserModel.js";
import { TOKEN_KEY } from "../config.js";
import jsonwebtoken from 'jsonwebtoken';

export function AuthMiddleware(request,response,next){

    const token=request.cookies.token
    if(!token){
        return response.redirect(301,'http://localhost:5173/login/')

    }
    jsonwebtoken.verify(token,TOKEN_KEY, async(err,data)=>{
        if(err){
            return response.redirect(301,'http://localhost:5173/signUp/')
        }else{
            const user=await User.findById(data.id)
            if (user){
                next();
            }else{
                return response.redirect(301,'http://localhost:5173/signUp/')
            }
        }
    })
}