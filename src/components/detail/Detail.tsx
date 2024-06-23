import {
  Facebook,
  FavoriteOutlined,
  Instagram,
  ThumbUp,
  X,
} from "@mui/icons-material";
import "./detail.css";
import { Alert, AlertColor, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Location, Path, useLocation } from "react-router";
import axios, { AxiosError } from "axios";
import { BASE64_IMG, URLS } from "../../constants/urls";
import { GetPost } from "../../types/home.module.type";
import { PostUserProp } from "../../types/post.module.type";
import { useContext } from "react";
import { AuthContext } from "../../context/user/AuthContext";
import Loader from "../loader/Loader";
import { Toast } from "../toast/Toast";
import Category from "../category/Category";



export default function Detail() {
  const locationSearch: Location & Path = useLocation();
  const [user, setUser] = useState<PostUserProp>();
  const { currentUser} = useContext(AuthContext);

  const [singlePost, setSinglePost] = useState<GetPost | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const [commentMsg,setCommentMsg] = useState<string>("")
  const [colorAlert,setColorAlert] =  useState<AlertColor>("error")
  const [isFetchingSinglePost,setIsFetchingSinglePost] = useState<boolean>(true)
  const [shareLink,setShareLink] =  useState<string>("")
  const [showToast,setShowToast] =  useState<boolean>(false)

  const likeHandler = async (_: DetailTypes.LikeEvent) => {
    setLike((prevstate) => {
      return isLiked ? prevstate - 1 : prevstate + 1;
    });
    //  like
    if (!isLiked) {
        await axios.patch<{ data: GetPost[] }>(
        URLS.likePost,
        {
          userId: currentUser?._id,
          postId: singlePost?._id,
        },
        {
          headers: {
            Authorization: "Bearer " + currentUser?.access_token,
          },
        }
      );
    } else {
       await axios.patch<{ data: GetPost[] }>(
        URLS.dislikePost,
        {
          userId: currentUser?._id,
          postId: singlePost?._id,
        },
        {
          headers: {
            Authorization: "Bearer " + currentUser?.access_token,
          },
        }
      );
  
    }
    setIsLiked(!isLiked);
  };

  const commentHandler = async (_: React.MouseEvent<HTMLButtonElement>) => {
    const my_comment: string | undefined = commentInputRef.current?.value;
   
   
    if(my_comment==""){
        setColorAlert("error")
        setCommentMsg("comment can't be empty")
        setTimeout(()=>{
           setCommentMsg("")
        },3000)
        return 
    }else{
        try {
             await axios.post(
              URLS.createComment,
              {
                comment:my_comment,
                postId: singlePost?._id,
                userId: currentUser?._id,
              },
              {
                headers: {
                  Authorization: "Bearer " + currentUser?.access_token,
                },
              }
            );
           
            setColorAlert("success")
            setCommentMsg("comment created")
            setTimeout(() => {
        
              commentInputRef.current!!.value = "";
              setCommentMsg("")
              setColorAlert("error")
            }, 3000);
          } catch (error) {
              if(error instanceof AxiosError){
                  setCommentMsg(error.response?.data.message.join(""))
                  setColorAlert("error")
                  setTimeout(()=>{
                    setCommentMsg(" ")
                    setColorAlert("error")
                  },3000)
              }else{
                  setCommentMsg("something went wrong")
                  setColorAlert("error")
                  setTimeout(()=>{
                      setColorAlert("error")
                      setCommentMsg("")
                  },3000)
              }
      
          }
    }
   
  };

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const { data } = await axios.get<{ data: GetPost[] }>(
          URLS.getPostFilter + locationSearch.search,
          {
            headers: {
              Authorization: "Bearer " + currentUser?.access_token,
            },
          }
        );
        setShareLink(window.location.href)
        setSinglePost(data.data[0]);
        setLike(data.data[0]!!.postLikes!!.length);
        setIsLiked(data.data[0]!!.postLikes!!.includes(currentUser?._id));
        setIsFetchingSinglePost(false)
      } catch (error) {
          setIsFetchingSinglePost(true)
      }
   
    };

    getSinglePost();
    return () => {};
  }, [locationSearch]);

  useEffect(() => {
    const getUserAssociatedWithPost = async () => {
      try {
        const { data } = await axios.get<{ data: PostUserProp[] }>(
          URLS.getUserFilter + "?id=" + singlePost?.userId
        );
        setUser(data.data[0]);
      } catch (error) {
        // console.log(error);
      }
    };
    getUserAssociatedWithPost();

    return () => {};
  }, [singlePost]);

  const sharePost=async(_:React.MouseEvent)=>{
    if(navigator.share){
       try {
         await navigator.share({
          title:singlePost?.postTitle,
          text:singlePost?.postDesc,
          
          url:shareLink
        })
       } catch (error) {
          setShowToast(true)
          
       }
    }
  }
  const handleCloseToast = (_:React.MouseEvent<HTMLButtonElement>)=>{
       setShowToast(false)
  }

  return (
    <>
    <Toast show={showToast}  message="cannot share post" onClose={handleCloseToast}/>
    {isFetchingSinglePost? <Loader/>  :
      <div className="detail">
       
      <div className="detail-container">
        <div className="detail-profile-container">
          <div className="detail-profile-content">
            <h1 className="detail-title">{singlePost?.postTitle}</h1>
            <div className="detail-profile">
              <div>
                <img
                  src={
                    user?.profile == ""
                      ? "assets/profile/blank_prof.png"
                      : BASE64_IMG + user?.profile
                  }
                  alt=""
                  className="detail-profile-img"
                />
              </div>
              <div className="detail-desc-profile">
                <div>
                  <p className="detail-profile-name">{user?.username}</p>
                  <p className="detail-date">
                    {singlePost?.createdAt.split("T")[0]}
                  </p>
                </div>

                <div className="detail-tech-stack">

                  { 
                    singlePost?.category.map((cat,index)=>{
                      return <Category cat={cat} key={index}/>
                    })
                  }
                  {/* <TechStack tech="nestjs" />
                  <TechStack tech="reactjs" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-post-image-container">
          <img
            src={BASE64_IMG + singlePost?.postImg}
            alt=""
            className="detail-post-img"
          />
          <Likes like={like} likeHandler={likeHandler} />
        </div>
      </div>
      <Share share={sharePost} />
      <div className="detail-desc-comment-container">
   
        <Description desc={singlePost?.postDesc} />
        <Comment
          commentInputRef={commentInputRef}
          commentHandler={commentHandler}
          msg ={commentMsg}
          alertColor={colorAlert}

        />
        
      </div>
    </div>
    }
  
    </>
  );
}

type ShareType={
     share:(e:React.MouseEvent)=>void
}
const   Share:React.FC<ShareType>= ({share})=> {
  return (
    <div className="detail-share">
      <X className="detail-icon" />
      <Facebook className="detail-icon" />
      <Instagram className="detail-icon" />
      <Button className="detail-icon" onClick={share}>share</Button>
    </div>
  );
}

function Comment({
  commentHandler,
  commentInputRef,
  msg,
  alertColor
}: DetailTypes.CommentEvent&{msg:string}&{alertColor:AlertColor}) {
   
  return (
    <>
  
    <div className="detail-comment">
      {msg.length> 1 && <Alert severity={alertColor}>{msg}</Alert>}
      <h1>Leave a Comment?</h1>

      <div className="detail-comment-content">
        <textarea
          ref={commentInputRef}
          name="comment"
          id="comment"
          placeholder="comment....."
        ></textarea>
        <Button onClick={commentHandler}>save</Button>
      </div>
    </div>
    </>
  );
  
}

function Likes({ likeHandler, like }: any) {
  return (
    <div className="detail-likes">
      <FavoriteOutlined
        style={{ color: "red" }}
        className="detail-like-btn"
        onClick={likeHandler}
      />
      <ThumbUp
        style={{ color: "#ddd" }}
        className="detail-like-btn"
        onClick={likeHandler}
      />
      <span className="detail-like-text">{like}likes</span>
    </div>
  );
}
type DescType = {
  desc: string | undefined;
};

function Description({ desc }: DescType) {
  return (
    <div className="detail-post-desc">
      <p className="detail-post-text">{desc}</p>
      <img
        src="/assets/post/post1.jpg"
        alt=""
        className="detail-post-posted-image"
      />
    </div>
  );
}
