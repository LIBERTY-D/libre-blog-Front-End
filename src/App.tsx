
import { useContext, useEffect, useState } from 'react'
import './App.css'
import DetailPage from './pages/detail/DetailPage'
import Home from "./pages/home/Home"
import Post from './pages/Post/Post'
import Write from './pages/write/Write'
import { AuthContext } from './context/user/AuthContext'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import {Route,Routes, BrowserRouter, Navigate} from "react-router-dom"
import { Update } from './pages/update/Update'

function App() {
  const {currentUser} = useContext(AuthContext)
  const [isUser,setIsUser] =  useState<boolean>(false)
  useEffect(()=>{
    setIsUser(currentUser!=null &&Object.keys(currentUser).length>0)
  },[currentUser])

   useEffect(() => {
    // const handleBeforeUnload = (e:BeforeUnloadEvent) => {
    //   const confirmationMessage = 'Are you sure you want to leave?';
    //   e.preventDefault()
    //   e.returnValue = confirmationMessage; 
     
    //   return confirmationMessage; 
    // };

    const handleUnload = () => {
      localStorage.removeItem("authenticatedUser")//remove user from localstorage
       
    };

    // window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      // window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={isUser?<Navigate to="/"/>:<Login/>}/>
      <Route path='/signup' element={isUser?<Navigate to="/"/>:<SignUp/> }/>
      <Route path='/posts' element={isUser?<Post/>:<Navigate to="/login"/>}/>
      <Route path='/write' element={isUser?<Write/>:<Navigate to="/login"/>}/>
      <Route path='/detail' element={isUser?<DetailPage/>:<Navigate to="/login"/>}/>
      <Route path="/update" element={isUser?<Update/>:<Navigate to="/login"/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
