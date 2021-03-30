import jwt from"jsonwebtoken";
import dotenv from"dotenv";

dotenv.config({path:"../../.env"});
export const generateAuthToken=(payload)=>{
    const token=jwt.sign({payload},process.env.SECRETKEY,{expiresIn:"1d"});
    return token;
}

export const dataFromToken = (token)=>{
    
    console.log(process.env.SECRETKEY)
    const data=jwt.verify(token,process.env.SECRETKEY);

    return data;
}