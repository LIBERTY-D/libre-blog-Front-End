import { GetPostProp } from "../../types/feed.module.type"
import {Center} from "../center/Center"
import Leftbar from "../leftbar/Leftbar"
import {RightBar} from "../rightbar/RightBar"
import "./feed.css"



export  const  Feed:React.FC<GetPostProp>= ({posts,setPosts})=> {
  return (
    <div className="feeds">
        <Leftbar/>
        <Center posts={posts} setPosts={setPosts}/>
        <RightBar posts={posts}/>
    </div>
  )
}
