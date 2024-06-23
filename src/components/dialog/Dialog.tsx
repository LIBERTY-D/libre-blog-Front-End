import React from "react"
import "./dialog.css"
import { useNavigate} from 'react-router-dom';


type Props={
    width?:number,
    height?:number,
    backgroundColor?:string
    borderRadius?:number,
    content?:messages[],
    deletePost?:(e:React.MouseEvent<HTMLParagraphElement>)=>void;
    editPost?:(e:React.MouseEvent<HTMLParagraphElement>)=>void;
    dialogHandler?:(e:React.MouseEvent<HTMLParagraphElement>)=>void,
    postId:string,
    hideAndUnhidePost?:(e:React.MouseEvent)=>void;
    isPostHidden?:boolean

}

type messages={
    message:string
}


export default function Dialog({dialogHandler,deletePost,editPost,postId,hideAndUnhidePost,isPostHidden}:Props) {
  
  const Navigate =  useNavigate()
  return (
    <div className="dialog" onClick={dialogHandler}>
        <p className="dialog-dialog-text edit" onClick={(e:React.MouseEvent)=>{
          editPost(e);
          Navigate({pathname:"/update",search:"?id="+postId})

        }}>edit post</p>
        <p className="dialog-dialog-text delete" onClick={deletePost}>delete post</p>
        <p className="dialog-dialog-text hide" onClick={(e:MouseEvent)=>{
              hideAndUnhidePost(e)
        }} >{!isPostHidden? "hide post":"show post"}</p>
    </div>
  )
}
