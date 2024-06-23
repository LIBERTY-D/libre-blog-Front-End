
import { useEffect, useState } from "react"
import { GetPostProp } from "../../types/center.module.type"
import {Post} from "../post/Post"
import { Toast } from "../toast/Toast"
import "./center.css"
import Loader from "../loader/Loader"



export const  Center:React.FC<GetPostProp>= ({posts,setPosts})=>{

  const [showToast,setShowToast] =  useState<boolean>(posts.length==0)
  
  const closeToast = ()=>{
       setShowToast(false)
  }
  useEffect(()=>{

    if(posts.length>0){
      setShowToast(false)
    }
  },[posts])

  
  const sortedPost = posts?.map((post)=>{
    return  post;
  }).sort((a,b)=>new Date(b.createdAt).getTime()- new Date(a.createdAt).getTime())


  const deletePostFrontEnd = (postId:string)=>{
       setPosts(sortedPost.filter((post)=>post._id!==postId))
  }

  return (
    <>
    <Toast show={showToast} message="fetching data" onClose={closeToast}/>
    
    <div className="center">
         {
         posts.length == 0 ?<Loader/>:sortedPost?.map((post,_)=>{
            return <Post key={post._id} post={post} deletePostFrontEnd={deletePostFrontEnd}/>
         })
         
         }
    </div>
    </>
  )
}
