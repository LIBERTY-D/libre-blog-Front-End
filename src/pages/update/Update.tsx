import {  useLocation } from "react-router-dom"
import TopBar from "../../components/topbar/TopBar"
import {Textbox} from "../../components/textbox/Textbox"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { URLS } from "../../constants/urls"
import { AuthContext } from "../../context/user/AuthContext"
import { GetPost } from "../../types/home.module.type"


export const  Update= ()=> {
    const {currentUser} = useContext(AuthContext)
    const [updatingPost,setUpdatingPost] = useState<GetPost[]>()
    const [updating,_] =  useState(true)
    const location =  useLocation()
    useEffect(()=>{
        const getPostUpdate = async ()=>{
           try {
               const {data} =  await axios.get(URLS.getPostFilter+location.search,{
                headers:{
                    Authorization:"Bearer "+currentUser.access_token
                }
               }) 
               setUpdatingPost(data.data)
           } catch (error) {
                console.log(error)
           }

        }
        getPostUpdate()

        return()=>{

        }
   },[])
   
  return (
   <>
      <TopBar/>
    <div className="write">
      <h1 className="write-heading">update post {currentUser.username}</h1>
      <Textbox updating={updating} updateData={updatingPost}/>
    </div> 

   </>
  )
}
