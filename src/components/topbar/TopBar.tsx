import {Instagram,X,Facebook} from '@mui/icons-material';

import "./topbar.css"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/user/AuthContext';
import { ACTIONS } from '../../constants/context';

export default function TopBar():JSX.Element{
  const {currentUser,dispatch} =  useContext(AuthContext)


  const handleLogout = async(e:React.MouseEvent)=>{
      localStorage.removeItem("authenticatedUser")
      dispatch({type:ACTIONS.LOGOUT,payload:null})
      

  }
  return (
    <nav className="topbar">
      <div className="topbar-left">
      <ul className="topbar-left-links">
      <li className="topbar-left-link">
        <Link to="/" style={{color:"#1877F2",textDecoration:"none"}}>
           LibreBlog
        </Link>
      </li>
          {/* <li className="topbar-left-link"><Instagram style={{color:"red"}}/></li>
          <li className="topbar-left-link"><X style={{color:"white"}}/></li>
          <li className="topbar-left-link"><Facebook style={{color:"blue"}}/></li> */}
   
        </ul>
      </div>
      <div className="topbar-center">
                {/* <h2>LibreBlog</h2> */}
      </div>

      <div className="topbar-right">
        <ul className="topbar-right-links">
          
          <Link to="/posts" className="topbar-right-link">  <li className="topbar-right-link">posts</li></Link>

          <Link className="topbar-right-link" to="/write"> <li className="topbar-right-link">write</li></Link>
       

          {currentUser==null||Object.keys(currentUser).length<=0&&    <Link to="/login" className="topbar-right-link">  <li className="topbar-right-link">Login</li></Link> }
          {Object.keys(currentUser).length>0&&  <li className="topbar-right-link" onClick={handleLogout}>logout</li>}
        </ul>
      </div>
    </nav>
  )
}
