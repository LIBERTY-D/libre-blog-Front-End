import { Alert, AlertColor, Button } from "@mui/material"
import "./signup.css"
import { Add} from "@mui/icons-material"
import { useRef, useState } from "react"
import { UserSignUp } from "../../types/signup.module.type"
import { Link } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { URLS } from "../../constants/urls"



export default function SignUp() {

    const [msg,setMsg]=  useState<string>("")
    const [materialClass,setMaterialClass] = useState<AlertColor>("error")

    const profRef = useRef<HTMLImageElement|undefined>(undefined)
    const passRef =  useRef<HTMLInputElement|undefined>(undefined)
    const usernameRef = useRef<HTMLInputElement|undefined>(undefined)
    const conRef = useRef<HTMLInputElement|undefined>(undefined)
    const emailRef = useRef<HTMLInputElement|undefined>(undefined)



    const [signupData,setSignUpData] =  useState<UserSignUp>({
         username:"",
         password:"",
         confirmPassword:"",
         email:"",
         profile:null
    })

    const handleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
          const fields =  e.target
          const key =  fields.name
          setSignUpData((prevState:UserSignUp)=>{
            return {...prevState,[key]:e.target.type==="file"?fields.files?.[0]:fields.value}
               
          })
        
    }
 
    const setInputsNorm = ()=>{
      
      setSignUpData({
        email:"",
        username:"",
        password:"",
        confirmPassword:"",
        profile:null
      })
      setMsg("")
      setMaterialClass("error")
        profRef!!.current!!.src=""
        passRef!!.current!!.value=""
        usernameRef!!.current!!.value=""
        conRef!!.current!!.value=""
        emailRef!!.current!!.value=""
    
    }
    const handleSignUp=async(_:React.MouseEvent<HTMLButtonElement>)=>{
      if(signupData.email===""||signupData.confirmPassword===""||signupData.password===""||signupData. username==""|| signupData.profile==null){
        setMaterialClass("error")
        setMsg("fields cannot be empty!")

        setTimeout(()=>{
            setMsg("")
        },3000)
        return;
      } 
      try{
          const formData =  new FormData();
          formData.append("username",signupData.username)
          formData.append("email",signupData.email)
          formData.append("password",signupData.password)
          formData.append("confirmPassword",signupData.confirmPassword)
          formData.append("profile",signupData.profile)
             await axios.post(URLS.createUserAccount,formData,
            {
              headers:{
                "Content-Type":"multipart/form-data"
              }
            }
          
           
        )
          setMsg("Account created")
          setMaterialClass("success")
             setTimeout(() => {
              setInputsNorm()
              location.assign("/login")
              
             }, 3000);
        }catch(error){
            if(error instanceof AxiosError){
              
              const field = error.response?.data.message
              if(field.confirmPassword){
                setMsg(field.confirmPassword);
              }else{
                setMsg(field)
              }
           
         

            }else{
              setMsg("An Uknown error occured")
            }

            setTimeout(()=>{
              setMsg("")
            },3000)
        }
    }
  

  return (
    <div className="signup-page">
    <div className="signup-container">
    <div className="signup-left">
           <h2 className="signup-head">Libre Blog</h2>
           <p className="signup-desc">Your are one step away from blogging with the community</p>
           <Link to="/" >
                  <Button style={{textDecoration:"none", color:"#ccc",marginLeft:"5px",}}>home</Button>
               </Link>
      </div>

      <div className="signup-right">
        {msg.length>0 && <Alert severity={materialClass} style={{marginBottom:"5px"}}>{msg}</Alert>}
         <div className="signup-right-img-container">
         <img ref={profRef} src={signupData.profile !==null?URL.createObjectURL(signupData.profile):"/assets/profile/blank_prof.png"} alt="" className="profilePicture" />
         <label htmlFor="file"> <Add  className="signup-right-chooseImage"/></label>
         <input name="profile" type="file" id="file" style={{display:"none"}} onChange={handleChangeInput}/>
          
         </div>
            <input ref={usernameRef} name="username" type="text" placeholder="username" onChange={handleChangeInput} />
           <input ref={emailRef} name="email" type="email" placeholder="email" onChange={handleChangeInput} />
           <input ref={passRef} name="password" type="password"  placeholder="password" onChange={handleChangeInput}/>
           <input ref={conRef} name="confirmPassword" type="password"  placeholder="confirm password" onChange={handleChangeInput}/>
           <Button onClick={handleSignUp}>signup</Button>
           <br />
           <span className="signup-dont">Have an account?</span> <Link to="/login">
           <Button>Login</Button>
           </Link>
      </div>

    </div>
   
</div>
  )
}
