
import { Link } from "react-router-dom"
import "./left.css"

import {GitHub, LanguageOutlined} from "@mui/icons-material"

export default function Leftbar() {
  return (
    <div className="leftbar">

      <div className="leftebar-container">
        <img className="leftbar-logo" src="/assets/me/logo.png" alt="" />
        <h1 className="leftbar-title">Libre Blog</h1>
        <p className="leftbar-desc">
          Stay up to date with current  trends and tricks.
           Join Our Community. Remeber to be friendly😊.
        </p>
        <div className="leftbar-owner">
          <h2 className="leftbar-owner-title">Admin</h2>
          <div className="leftbar-owner-container">
             <img src="/assets/me/daniel-big.jpeg" alt="" className="leftbar-owner-img" />
             <div>
                  <span className="leftbar-owner-name">Daniel Mukubvu</span>
                  <p className="leftbar-owner-date">2024-04-26</p>
             </div>

            
          </div>
          <div className="leftbar-follow">
                 <button className="leftbar-follow-btn">follow</button>
             </div>
        
        </div>
        <LeftBarIcons/>
      </div>
     <LeftBarBottom/>
    </div>
  )
}

function LeftBarIcons(){
    return(
           <div className="leftbar-icons">
               <a className="link" href="https://github.com/LIBERTY-D/" target="_blank"> <GitHub className="leftbar-icon" /></a>
              
              <a className="link" href="https://liberty-mukubvu.netlify.app/" target="_blank">   <LanguageOutlined  className="leftbar-icon" style={{color:" #1877F2"}}/></a>
            
           </div>
    )
}

function LeftBarBottom(){
  return (
    <div className="leftbar-bottom">
         <span className="leftbar-bottom-link">Libre Blog</span>

        <Link className="link" to="/posts"> <span className="leftbar-bottom-link" >Posts</span></Link>
        
       <Link className="link" to="/write">   <span className="leftbar-bottom-link" id="write">Write</span></Link>
    
         
    </div>
  )
}