import { User } from "../models/UserModel.js";
import { TOKEN_KEY } from "../config.js";
import jsonwebtoken from 'jsonwebtoken';

export function UserVerification(request,response,next){

    const token=request.cookies.token
    if(!token){
        return response.json({ status: false })

    }
    jsonwebtoken.verify(token,TOKEN_KEY, async(err,data)=>{
        if(err){
            return response.json({ status: false })
        }else{
            const user=await User.findById(data.id)
            if (user){
                return response.json({ status: true, user: user.username })
            }else{
                response.json({ status: false })
            }
        }
    })
}