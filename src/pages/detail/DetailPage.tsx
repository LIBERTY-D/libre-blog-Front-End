import { Link } from "react-router-dom"
import Detail from "../../components/detail/Detail"
import TopBar from "../../components/topbar/TopBar"
import "./detailpage.css"


export default function DetailPage() {
  return (
       <>
        <TopBar/>
      <div className="detail-page">
               <Link to="/" style={{textDecoration:"none",fontSize:"25px", color:"#1877F2"}} >
                   Home
               </Link>
        <Detail/>
      </div>
      </>
  ) 
}
