import { TOKEN_KEY } from "../config.js";
import jsonwebtoken from 'jsonwebtoken';

export const createSecretToken=(id)=>{
    return jsonwebtoken.sign({id},TOKEN_KEY,{
        expiresIn:3*24*60*60,
    });
};