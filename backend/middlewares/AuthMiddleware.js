import { User } from "../models/UserModel.js";
import { TOKEN_KEY } from "../config.js";
import jsonwebtoken from 'jsonwebtoken';

export function AuthMiddleware(request,response,next){
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader.split(' ')[1]; 

    jsonwebtoken.verify(token,TOKEN_KEY, async(err,data)=>{
        if(err){
            console.log('bad token')
            return response.status(401).send({Message:"Bad Token"})
        }else{
            const user=await User.findById(data.id)
            if (user){
                request.user=user
                next();
            }else{
                next();
            }
        }
    })
}