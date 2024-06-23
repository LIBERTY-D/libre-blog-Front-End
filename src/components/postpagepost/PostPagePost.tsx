import React, { useEffect, useState } from 'react'
import { GetPost } from '../../types/home.module.type'
import  './postpagepost.css'
import { BASE64_IMG, URLS } from '../../constants/urls'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ContextTypes } from '../../types/context.module.type';
import Category from '../category/Category'

export const  PostPagePost:React.FC<{post:GetPost}>= ({post})=> {
   const [userAssociatedWithPost,setUserAssociatedWithPost]=useState<ContextTypes.User>()

  useEffect(()=>{
        const getUserAssociatedWithPost = async ()=>{
           try {
               const {data} =  await axios.get<{data:ContextTypes.User[]}>(URLS.getUserFilter+"?id="+post.userId) 
               setUserAssociatedWithPost(data.data[0])
           } catch (error) {
                // console.log(error)
           }

        }
        getUserAssociatedWithPost()

        return()=>{

        }
   },[post])
  
  return (
  
    <div className='post-container'>
        <div className="post-content">
        <Link style={{textDecoration:"none"}} to={{pathname:"/detail",search:"?id="+post._id}}>
            <div className="post-content-image-container">
                <img className='post-content-image' src={BASE64_IMG+post.postImg} alt="[postImg]" />
            </div>
            </Link>
            <div className="post-content-info">
                <h1 className="post-content-title">{post.postTitle}</h1>
                <p className="post-content-desc">{post.postDesc.slice(0,100)}..</p>

                <div className="post-content-profile">
                    <img src={userAssociatedWithPost?.profile==""?"assets/profile/blank_prof.png":BASE64_IMG+userAssociatedWithPost?.profile} alt="[profileImg]" className="post-content-profile-img" />
                    <p className="post-content-profile-name">{userAssociatedWithPost?.username}</p>
                    <p className="post-content-profile-date">{post.createdAt.split("T")[0]}</p>

                </div>
                <div className="post-teck-stack-container">
                    {post.category.map((cat,index)=>{
                        return <Category cat={cat} key={index} />
                    })}
                     {/* <TechStack tech="nestjs"/>
                     <TechStack tech="TypeScript"/>
                     <TechStack tech="Java"/> */}
                </div>
            </div>
          
        </div>

    </div>
 
  )
}
