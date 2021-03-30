import express from'express';
import {verifyAuth }from'../middleWare/authVerification';
import blogController from '../controller/blogController';
const blogrouter=express. Router();
blogrouter.post('/blog/create',verifyAuth,blogController.createBlog);

blogrouter.get('/blog/get',verifyAuth,blogController.getAllBlog);
blogrouter.get('/blog/get/:blogId',verifyAuth,blogController.getOne);
blogrouter.delete('/blog/get/:blogId',verifyAuth,blogController.delete);
blogrouter.patch('/blog/get/:blogId',verifyAuth,blogController.updateOne);
export default blogrouter;