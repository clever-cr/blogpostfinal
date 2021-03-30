import blogData from '../model/blogmodel';
const Articles = [];
class blogController{
    static getAllBlog=(req,res)=>{
        const data=Articles;
        return res.status(200).json({
status:200,
message:"these are  blogs",
data
        })
    }
    static createBlog =(req,res)=>{
        const blogId=Articles.length + 1;
        let{
            title,
            content,
            userid
        }=req.body
        const timestamp=new Date(Date.now());
        const Article = new blogData( blogId,title,content,timestamp,userid );
        Articles.push(Article);

    const data=Articles.find(( Article) =>  Article.blogId===blogId);
    if(!data){
        return res.status(417).json({
            status:417,
            message:"blog not created"
        })
    }
    return res.status(201).json({
        status:201,
        message:"blog created successfully",
      data
    })
}
static getOne=(req,res)=>{
    const blogId=req.params.blogId;//param?90+





    
    const data=Articles.find(Article=> Article.blogId==blogId);
    if(!data){
        return res. status(401).json({
            status:401,
            message:"doesn't exist"
        })
    }
    return res.status(200).json({
status:200,
message:"ok successfully",
data
    })


}
static delete=(req,res)=>{
    const blogId=req.params.blogId;
    const data= Articles.findIndex(Article=>Article.blogId==blogId);
if(data===-1){
    return res.status(404).json({
        staus:404,
        message:"not exist"
    })
  
}
    const remove=Articles.splice(data,1);
   
   return res.status(201).json({
       status:201,
       message:"deleted successfully",
      data

   })
    
}
static updateOne=(req,res)=>{
    const blogId=req.params.blogId;
    const dataIndex= Articles.findIndex(Article=>Article.blogId==blogId);
if(dataIndex===-1){
    return res.status(404).json({
        staus:404,
        message:"not exist"
    })
  
}


let{
    title,
    content,
    userid
}=req.body
const timestamp=new Date(Date.now());
const Article = new blogData( blogId,title,content,timestamp,userid );


//Articles.splice(dataIndex,1);

Articles[dataIndex]=Article;

const data=Articles.find(Article=> Article.blogId==blogId);

if(!data){
    return res.status(417).json({
        satus:417,
        message:"not updated"
    })
}

   
   return res.status(201).json({
       status:201,
       message:"updated successfully",
      data

   })
    }
}
   
   
    



export default blogController;

