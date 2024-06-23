import { GetPost } from "./home.module.type";


export interface PostProp{
    post:GetPost,
    deletePostFrontEnd:(postId:string)=>void
    
  
}

export interface PostUserProp{
    _id:string;
    username:string;
    email:string;
    followers:string[];
    following:string[];
    profile:string;
    coverPhoto:string;
    posts:[];
   
}

export interface AxiosPostUserProp{
    data:PostUserProp[]
}