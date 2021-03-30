 import UserController from"../controller/Authcontroller";
 import {dataFromToken} from "../Helpers/token";
export const verifyAuth=(req,res,next)=>{
     const token=req.header("x-auth-token");
     if(!token ){
         return res.status(404).json({
status:404,
message:"no token provided"
         })
     }
try{


   // console.log("<><><><>",token.trim())
    const user=dataFromToken(token).payload;

   // console.log(">>>>>>>>>>>>>>>>>>>",user)
    const Users=UserController.Users;
    const data=Users.find(u=>u.email== user.email);
    
    if(!data){
        return res.status(404).json({
            status:404,
            message:"you're  not a user"
        })

    }
    
    req.body.userid=data.id;//userid from blogmodel and id from user model
    return next();
    
}catch(e){

    return res.status(404).json({
        status:404,
        message:"invalid token"
    })
}
 }