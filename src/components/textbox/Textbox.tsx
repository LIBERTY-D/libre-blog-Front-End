import React, { FC, useContext, useEffect, useRef, useState } from "react";
import "./textbox.css";
import {
  Add,
  FileUpload
} from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import axios, { AxiosError } from "axios";
import { URLS } from "../../constants/urls";
import { AuthContext } from "../../context/user/AuthContext";
import { GetPost } from "../../types/home.module.type";
import { base64ToFile } from "../../constants/reuse";

import Category from "../category/Category";
import { CATEGORY } from "../../constants/category";



type  TextBoxProp ={
     updating:boolean,
     updateData:GetPost[]|undefined

}

export const  Textbox:FC<TextBoxProp>= ({ updating, updateData})=> {
  
  const { currentUser } = useContext(AuthContext);

  const [postInfo, setPostInfo] = useState<TexbBoxTypes.Post>({
    postTitle: "",
    postDesc: "",
    postImg: null,
    category:[]
  });

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);


  const [iseErr, setIsErr] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const  [selectedCategory,setSelectedCategory] = useState<(string|null)[]>([])
  const  categoryRef =  useRef<HTMLDivElement>()

  useEffect(() => {
    if (updating && updating !==undefined && updateData) {
      setIsImage(true);
      setPostInfo({postTitle:updateData[0].postTitle,postDesc:updateData[0].postDesc,postImg:base64ToFile(updateData[0].postImg,"updated.jpeg")})
    }
  
  }, [updateData, updateData]);
  const emptyInputsAfterSuccess = () => {
  
    setTimeout(() => {
      setIsErr(false);
      setErrMsg("");
      setIsImage(false);
      setPostInfo({ postTitle: "", postDesc: "", postImg: null });
      setSuccessMsg("");

    }, 3000);
  };
  const handleSubmit = async () => {
    if (
      postInfo.postTitle === "" ||
      postInfo.postDesc == "" ||
      postInfo.postImg == null
    ) {
      setIsErr(true);
      setErrMsg("title, message and image are required");
      setTimeout(()=>{
        setIsErr(false);
        setErrMsg("")
      },3000)
      return;
    } 
      if(updating && updateData){//check if we updating 
         await handleUpdate()
      }else{
        await createPost()
      }
  };

  const showOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const inputsHandler = (e: React.ChangeEvent<(HTMLInputElement|HTMLTextAreaElement)>) => {
    const field:(HTMLInputElement|HTMLTextAreaElement) = e.target 
    if (field.name === "postImg") {
        if (field.files && field.files[0]) {
             setIsImage(true);
            setPostInfo((prevState) => {
                return { ...prevState, [field.name]: field.files[0] };
            });
        } else {
            console.warn("No files found in the input field.");
        }
    } else {
        setPostInfo((prevState) => {
            return { ...prevState, [field.name]: field.value };
        });

    }
};

  const createPost = async()=>{
      try {
        let postData = { ...postInfo, userId: currentUser?._id };
        postData.postImg = "post.png";
        postData.category = selectedCategory
        const { data } = await axios.post<{ data: GetPost[] }>(
          URLS.createPost,
          postData,
          {
            headers: {
              Authorization: "Bearer " + currentUser?.access_token,
            },
          }
        );

        const formData = new FormData();
        formData.append("file", postInfo.postImg);
        await axios.post(URLS.uploadImage + data.data[0]._id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + currentUser?.access_token,
          },
        });
        setSuccessMsg("sucessfully posted");
        removeSelectedAfterSubmission()
        emptyInputsAfterSuccess(); //empty inputs after succes post
      } catch (error) {
        setIsErr(true);
        if (error instanceof AxiosError) {
          setErrMsg(error.response?.data.message);
          setTimeout(() => {
            setIsErr(false);
            setErrMsg("");
          }, 3000);
        } else {
          setErrMsg("an error occured");
          setTimeout(() => {
            setIsErr(false);
            setErrMsg("");
          }, 3000);
        }
      }
  }

  const handleUpdate = async () => {
      try {
        const formData = new FormData();
        formData.append("file", postInfo.postImg);
        formData.append("postDesc",postInfo.postDesc)
        formData.append("postTitle",postInfo.postTitle)
        formData.append("userId",currentUser._id)
        formData.append("postId",updateData[0]._id)
        
        await axios.patch(URLS.updatePost, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + currentUser?.access_token,
          },
        });
        setSuccessMsg("sucessfully updated");
        emptyInputsAfterSuccess(); //empty inputs after succes post
      } catch (error) {
        setIsErr(true);
        if (error instanceof AxiosError) {
          setErrMsg(error.response?.data.message);
          setTimeout(() => {
            setIsErr(false);
            setErrMsg("");
          }, 3000);
        } else {
          setErrMsg("an error occured");
          setTimeout(() => {
            setIsErr(false);
            setErrMsg("");
          }, 3000);
        }
    }
  };

  // HANDLE CATEGORY SELECTION
  const handleCategorySelect = (e:React.MouseEvent<HTMLDivElement>)=>{
             if((e.target as HTMLDivElement).classList.contains("cat")){
                (e.target as HTMLDivElement).classList.toggle("selected")
                 const selections:(string|null)[]=  Array.from(categoryRef.current!!.getElementsByClassName("selected")).map((selected)=>selected?.textContent)
                 setSelectedCategory(selections)
       }
  }
  // REMOVED SELECTED CLASS
  const removeSelectedAfterSubmission=()=>{
      Array.from(categoryRef.current!!.getElementsByClassName("selected")).forEach((element,_)=>{
           element.classList.remove("selected")
      })
  }

  return (
    <>
      {iseErr && <Alert severity="error">{errmsg}</Alert>}
      {successMsg.length > 0 && <Alert severity="success">{successMsg}</Alert>}
      <div className="text-box">
        <div className="text-box-container1">
          <div className="text-box-options">
            <div className="text-box-toggle" onClick={showOptionsHandler}>
              <Add className="text-box-icon-style add" />
            </div>
            {/* {showOptions && (
              <div className="text-box-option">
                <div className="bold">
                  <FormatBold className="text-box-icon text-box-icon-style" />
                </div>
                <div className="italic">
                  <FormatItalic className="text-box-icon text-box-icon-style italic" />
                </div>
                <div className="title">
                  <Title className="text-box-icon text-box-icon-style title" />
                </div>
              </div>
            )} */}
          </div>

          <div className="text-box-inputs">
            <input
              type="text"
              value={postInfo.postTitle}
              name="postTitle"
              className="text-box-title"
              placeholder="Enter title"
              onChange={inputsHandler}
            />
            <textarea
              name="postDesc"
              className="text-box-desc"
              placeholder="Enter message..."
              value={postInfo.postDesc}
              onChange={inputsHandler}
            />
            <label
              className="text-box-file-upload-label"
              htmlFor="text-desc-up"
            >
              <FileUpload className="text-box-file-upload" /> upload
            </label>
            <input
              onChange={inputsHandler}
              type="file"
              name="postImg"
              id="text-desc-up"
              style={{ display: "none" }}
            />
            {/*  start of tags*/}
             {
              !updating &&  <div className="tags-container" ref={categoryRef} onClick={handleCategorySelect}>
              {Object.values(CATEGORY).map((category,index)=>{
               return  <Category cat={category} key={index} />
              })}
         </div>
             }
            {/* end of tags */}

            <Button
              type="button"
              className="text-box-post-btn"
              onClick={handleSubmit}
            >
              post
            </Button>
          </div>
        </div>
        <div className="text-box-container2">
          <h1 className="text-box-output-title">{postInfo?.postTitle} </h1>
          {isImage && (
            <img
              className="text-box-img"
              src={
                 updating  == false||updating == undefined
                  ? URL.createObjectURL(postInfo.postImg)
                  : updating&&  URL.createObjectURL(postInfo.postImg)
              }
              alt="image"
            />
          )}
          <p className="text-box-output-desc">{postInfo?.postDesc}</p>
        </div>
      </div>
    </>
  );
}
