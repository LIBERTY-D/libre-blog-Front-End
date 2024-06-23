import { createContext, FC, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { ContextTypes } from "../../types/context.module.type";
import { ACTIONS } from "../../constants/context";

// Initial user state
export const init: ContextTypes.User = {
  
};


export type ProviderProps = {
  currentUser: ContextTypes.User;
  dispatch: React.Dispatch<ContextTypes.Action>;
};


export const AuthContext = createContext<ProviderProps | null>(null);


export const Auth: FC<ContextTypes.UserApiProps> = ({ children }) => {
  const [currentUser, dispatch] = useReducer<ContextTypes.Reducer>(reducer, init);
  
  useEffect(()=>{
    const currentUserInStorage = localStorage.getItem("authenticatedUser")
    if(currentUserInStorage){
      dispatch({type:ACTIONS.LOGIN_START,payload:JSON.parse(currentUserInStorage)})
    }

  },[])
  return (
    <AuthContext.Provider value={{ currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
