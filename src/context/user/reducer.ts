import { ACTIONS } from "../../constants/context";
import { ContextTypes } from "../../types/context.module.type";




export const reducer:ContextTypes.Reducer= (state,action)=>{

     switch(action.type){
        case  ACTIONS.LOGIN_START:
            return {
                ...state,
                ...action.payload
            }
    
        case  ACTIONS.LOGOUT:
            
            return {}
        default:
            return state
       
     }
  

    
}