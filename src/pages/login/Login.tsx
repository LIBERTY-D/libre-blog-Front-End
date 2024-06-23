import { Alert, Button } from "@mui/material"
import "./login.css"
import React, { useState } from "react"
import { UserLogin } from "../../types/login.module.type"
import { useContext } from 'react';
import { AuthContext } from "../../context/user/AuthContext";
import axios, { AxiosError } from "axios";
import { URLS } from "../../constants/urls";
import { ACTIONS } from "../../constants/context";
import { Link } from "react-router-dom";

export default function Login() {
  const {dispatch} =  useContext(AuthContext)
  const [errMsg,setErrMsg] = useState<string>("")
  
  const [LoginData,SetLoginData] =  useState<UserLogin>({
    username:"",
    password:"",
   
})
const handleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
     const fields =  e.target
     const key =  fields.name
     SetLoginData((prevState:UserLogin)=>{
       return {...prevState,[key]:fields.value}
          
     })
   
}
  const handleLogin=async (_:React.MouseEvent<HTMLButtonElement>)=>{
            
           if(LoginData.email==="" || LoginData.password===""){
             setErrMsg("fill in all fields")
             setTimeout(()=>{
              setErrMsg("")
             },3000)
            return 
           }
            
            try{
              const login =  await axios.post(URLS.loginUser,{username:LoginData.email,password:LoginData.password})
               localStorage.setItem("authenticatedUser",JSON.stringify(login.data))
               dispatch({type:ACTIONS.LOGIN_START,payload:login.data})
               setTimeout(()=>{
                
                SetLoginData({
                  username:"",
                  email:"",
                  password:""
                })
               },3000)
  
            }catch(error){
                if(error instanceof AxiosError){
                     setErrMsg(error.response?.data.message)
                }else{
                  setErrMsg("An uknown error ocuured")
                }
                setTimeout(()=>{
                  setErrMsg("")
             
                },3000)
            }
             
  }

  
  return (
    <> 
   {errMsg.length>0 &&  <Alert severity="error">{errMsg}</Alert>}
    <div className="login-page">
        <div className="login-container">
        <div className="login-left">
               <h2 className="login-head">Libre Blog</h2>
               <p className="login-desc">Your are one step away from blogging with the community</p>
                <Link to="/" >
                  <Button style={{textDecoration:"none", color:"#ccc",marginLeft:"5px",}}>home</Button>
               </Link>
          </div>

          <div className="login-right">
               <input name="email" type="text" placeholder="username/email" onChange={handleChangeInput} />
               <input name="password" type="password"  placeholder="password" onChange={handleChangeInput}/>
               <Button onClick={handleLogin}>login</Button>
               <br />
               <span className="login-dont">Don't have an account</span> <Link to="/signup">
               <Button>register</Button>
               </Link>

          </div>

        </div>
       
    </div>
    </>
  )
}
