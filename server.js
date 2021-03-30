
import express from"express";
import bodyParse from "body-parser";
import dotenv from"dotenv";
import router from './server/routes/Authroute';
import blogrouter from './server/routes/blogRoute';

dotenv.config({path:"./.env"});
const app=express();
app.use(bodyParse.json());
app.use('/api/v1/blogpost',router);
app.use('/api/v1/blogpost',blogrouter);
const port=process.env.PORT;

app.listen(port,()=>{
    
    console.log(`sever is running on port ${port}`);
})

app.use('/',(req,res)=>{
    res.status(200).send({
        statu:200,
        message:"this is blog api"
  })
})

export default app;
