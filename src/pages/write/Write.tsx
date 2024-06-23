import { useContext } from "react"
import {Textbox} from "../../components/textbox/Textbox"
import TopBar from "../../components/topbar/TopBar"
import "./write.css"
import { AuthContext } from "../../context/user/AuthContext"
import { Link } from "react-router-dom"


export default function Write() {
  const {currentUser} = useContext(AuthContext)
  return (
    <>
    <TopBar/>
    <div className="write">
      <Link className="link" to="/"> <span className="home-link" >Home</span></Link>
        
      <h1 className="write-heading">Start Blogging {currentUser?.username}</h1>
      <Textbox updating={false} updateData={undefined}/>
    
    </div>
    </>
  )
}
