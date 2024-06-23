import React, {  useContext, useEffect, useState } from "react";
import Category from "../category/Category";
import Dialog from "../dialog/Dialog";
import "./post.css"
import MoreVert from '@mui/icons-material/MoreVert';
import { PostProp, PostUserProp } from "../../types/post.module.type";
import axios, {AxiosError } from "axios";
import { BASE64_IMG, URLS } from "../../constants/urls";
import {Link, useNavigate}  from "react-router-dom"
import { AuthContext } from "../../context/user/AuthContext";
import { Toast } from "../toast/Toast";
import { Exception } from "../../exceptions/Exception";



export const Post:React.FC<PostProp>=({post,deletePostFrontEnd}) =>{
    const [showOperations,setShowOperations]=useState<boolean|null>(false)
    const [user,setUser] =  useState<PostUserProp>()
    const {currentUser} =  useContext(AuthContext)
    const [isPostHidden,setIsPostHidden] =  useState<boolean>(false)
    const [showToast,setShowToast] =  useState<boolean>(false)
    const [errMsg,setErrMsg] =  useState<string>("")
    const changePage =  useNavigate()

       useEffect(()=>{
         const getUserAssociatedWithPost = async ()=>{
            try {
                const {data} =  await axios.get<{data:PostUserProp[]}>(URLS.getUserFilter+"?id="+post.userId) 
                setUser(data.data[0])
            } catch (error) {
                if(error instanceof AxiosError){
                    knownError(error)
                }else{
                    uknownError()
                }
                 setShowToast(true)
                
            }

         }
         getUserAssociatedWithPost()

         return()=>{

         }
    },[])



    const uknownError = ()=>{
        setErrMsg(Exception.uknownError)
    }
    const knownError=(e:AxiosError)=>{
        setErrMsg(Exception.knownError(e))

    }
    useEffect(()=>{
        setIsPostHidden(post.hide)
    },[])

    const showModal = (_:React.MouseEvent):void=>{
       setShowOperations(!showOperations)
     
    }

    const  handleScroll = ()=>{
        setShowOperations(false)
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  
    const deletePost = async(_:React.MouseEvent)=>{
        try{
         
            await axios.delete(URLS.deletePost,{
                data:{
                  userId:currentUser?._id,
                  postId:post._id
                },
                headers:{
                Authorization:"Bearer "+currentUser?.access_token,
                
            }})
            deletePostFrontEnd(post._id)
          
            setTimeout(()=>{
                // window.location.reload()
                // changePage("/")
            },2000)
            
        }catch(error){
            if(error instanceof AxiosError){
                knownError(error)
            }else{
                uknownError()
            }
             setShowToast(true)
        
        }
            

    }

    const editPost =  async(_:React.MouseEvent)=>{
        changePage("update")  
    } 

    const hideAndUnhidePost = async()=>{
        try{
            const {data} = await axios.patch(URLS.hideUnhidePost,{
                postId:post._id
            },{
                headers:{
                Authorization:"Bearer "+currentUser?.access_token,
                
            }})
            setIsPostHidden(data.data[0].hide)
        }catch(error){
            if(error instanceof AxiosError){
                knownError(error)
            }else{
                uknownError()
            }
             setShowToast(true)
        }
    }
 
    const handleCloseDialogPost=(_:React.MouseEvent<HTMLDivElement>)=>{
        if(showOperations){
            setShowOperations(false)
        }
    }

    const onClose = (_:React.MouseEvent<HTMLButtonElement>)=>{
          setShowToast(false)
    } 

    
  return (
   <>
   <Toast show={showToast} message={errMsg} onClose={onClose}/>
    <div className="post" onClick={handleCloseDialogPost}>
       
        <div className="post-image-container">
            <img src={post.postImg!==''?BASE64_IMG+post.postImg:"/assets/post/post1.jpg"} alt="[postImg]" className="post-img" />

        </div>
        <div className="post-profile-top">
            <div className="post-profile">
                  <img src={user?.profile==""?"/assets/profile/blank_prof.png":BASE64_IMG+user?.profile} alt="" className="post-profile-img" />
                  <span className="post-profile-name">{user?.username}</span>
                 { Object.keys(currentUser).length>0 &&currentUser._id==post.userId&& 
                  <MoreVert onClick={showModal} className="post-profile-more"/>}

            </div>
            
            <div className="post-profile-date">
                <span>{post.createdAt.split("T")[0]}</span>
            </div>
            <div className="post-profile-title">
                <h2>
                  {post.postTitle}
                </h2>
            </div>
            <div className="post-profile-desc">
                <p>{post.postDesc.slice(0,100)}.. </p>
              
                <Link to={{pathname:"/detail", search:"?id="+post._id}}>  <button className="post-profile-readmore">READ MORE</button></Link>
            </div>
           <div className="post-profile-category">
              {post.category.map((post_cat,index)=>{
                return  <Category  cat={post_cat} key={index}/>
              })}
              
            
           </div>
          
        </div>
       {showOperations && <Dialog dialogHandler={showModal} deletePost={deletePost} editPost={editPost} postId={post._id} hideAndUnhidePost={hideAndUnhidePost} isPostHidden={isPostHidden}/>}
      
    </div>
    </>
  )
}
