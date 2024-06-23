import { UserLogin } from "./login.module.type"

export interface UserSignUp extends UserLogin {
  
    password:string;
    confirmPassword:string;
    profile:File|null;
 }