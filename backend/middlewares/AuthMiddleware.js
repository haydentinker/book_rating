import { User } from "../models/UserModel.js";
import { TOKEN_KEY } from "../config.js";
import jsonwebtoken from 'jsonwebtoken';

export function AuthMiddleware(request,response,next){
    console.log(request.headers)
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
        console.log('no')
        return response.redirect(301, 'http://localhost:5173/login/');
    }
    const token = authorizationHeader.split(' ')[1]; 

    if (!token) {
        return response.redirect(301, 'http://localhost:5173/login/');
    }
    jsonwebtoken.verify(token,TOKEN_KEY, async(err,data)=>{
        if(err){
            return response.redirect(301,'http://localhost:5173/signUp/')
        }else{
            const user=await User.findById(data.id)
            if (user){
                request.user=user
                next();
            }else{
                return response.redirect(301,'http://localhost:5173/signUp/')
            }
        }
    })
}