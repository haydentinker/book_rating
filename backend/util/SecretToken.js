import { TOKEN_KEY } from "./config.js";
const jwt = require("jsonwebtoken");

export const createSecretToken=(id)=>{
    return jwt.sign({id},TOKEN_KEY,{
        expiresIn:3*24*60*60,
    });
};