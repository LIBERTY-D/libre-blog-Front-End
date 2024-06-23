import { useContext, useEffect, useState } from "react"
import {Feed }from "../../components/Feed/Feed"
import TopBar from "../../components/topbar/TopBar"
import "./home.css"
import axios from "axios"
import { URLS } from "../../constants/urls"
import { GetPost } from "../../types/home.module.type"
import {  AuthContext } from "../../context/user/AuthContext"


export default function Home() {
const [posts,setPosts] =  useState<GetPost[]>([])
const {currentUser} = useContext(AuthContext)

  useEffect(()=>{
   const  fetchPost =  async ()=>{
         try {
          const {data} =  await axios.get<{data:GetPost[]}>(URLS.getPosts)
           setPosts(data.data.filter(post => !(post.hide && post.userId !== currentUser._id)));//hide post to other users but only show for the user who made the action
         } catch (error) {
            console.log(error)
         }     
   }
     fetchPost()
   return()=>{
   }

  },[])

  return (
    <>
       <TopBar/>
        <main className="home">
            <Feed posts={posts} setPosts={setPosts}/>
          
        </main>
    </>

  )
}
