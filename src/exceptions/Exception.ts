import { AxiosError } from "axios"

export class Exception{
    static uknownError = ()=>{
        return "something went wrong"
    }
    static knownError=(e:AxiosError)=>{
        return e.response?.data?.message +" or double "+"check your network connection"

    }
 
}