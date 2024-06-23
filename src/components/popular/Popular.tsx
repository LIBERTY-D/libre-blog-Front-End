import { Link } from "react-router-dom"
import { BASE64_IMG } from "../../constants/urls"
import { GetPost } from "../../types/home.module.type"
import "./popular.css"
import {StarBorder} from "@mui/icons-material"
export const Popular:React.FC<{post:GetPost}>=({post})=> {
  return (

    <Link style={{textDecoration:"none"}} to={{pathname:"detail",search:"?id="+post._id}}>
    <div className="popular">
      <div className="popular-container">
           <img src={BASE64_IMG+post.postImg} alt="[postImg]" className="popular-img" />
            <div className="popular-container-info">
              <h2 className="popular-title">{post.postTitle}</h2>
            <span className="popular-date">{post.createdAt.split("T")[0]}</span>

            <div className="popular-rating">
                <Star/>
                <Star/>
                <Star/>
                <Star/>
                <Star/>
            </div>
            </div>

      </div>
        
    </div>
    </Link>
  )
}


function Star(){
   return <StarBorder className="star-rating"/>
}
