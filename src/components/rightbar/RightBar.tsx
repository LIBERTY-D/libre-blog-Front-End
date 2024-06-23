import React, { useEffect, useState } from "react"
import { CATEGORY } from "../../constants/category"
import Category from "../category/Category"
import {Popular }from "../popular/Popular"
import "./rightbar.css"
import { GetPost } from "../../types/home.module.type"

const category:CATEGORY[]=Object.values(CATEGORY)

export const  RightBar:React.FC<{posts:GetPost[]}>=({posts})=> {
    const [popularPost,setPopularPost] = useState<GetPost[]>([])
    
    useEffect(()=>{
              const mostLiked = posts.filter((post,_)=>post.postLikes!!.length>=5)
              setPopularPost(mostLiked)
    },[posts])

  return (
    <div className="rightbar">
      <div className="rightbar-category-container">
        <h1 className="rightbar-category-title">Category</h1>
      <div className="rightbar-category">
        {category.map((cat:string,index)=>{
          return   <Category key={index+1} cat={cat} isRightbar={true}/>
         })}
        </div>
      </div>

      <div className="rightbar-popular-container">
        <h1 className="rightbar-popular-title">
           Popular
        </h1>
        <h3 className="rightbar-popular-tiitle-second">
            What's hot?
        </h3>
        <div className="rightbar-popular-content">
             {popularPost.length>0 ? popularPost.map((post)=>{
              return    <Popular post={post} key={post._id}/>
             }):<div className="rightbar-nothing-to-show">
                     
                     No popular Posts
                  
             </div>
             
             }
        
        </div>

      </div>
     
    </div>

  )
}
