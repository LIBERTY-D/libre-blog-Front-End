import  { ReactNode } from "react";
export namespace ContextTypes{
    export type User={
        _id:string;
        username?:string,
        email?:string,
        followers?:string[],
        following?:string[],
        profile?:string
        coverPhoto:string;
        access_token:string
    
    
    } 
    export interface Action {
        type: string;
        payload?: any;
    }
    
    export type Reducer = (state: ContextTypes.User, action: Action) => ContextTypes.User;
    export interface UserApiProps {
      children: ReactNode;
    }
}