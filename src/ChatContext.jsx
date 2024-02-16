/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext,  useReducer } from "react";
import { useAuthContext } from "./authContext";

let chatContext=createContext();

export let useChatContext=()=>{

    return useContext(chatContext);
}

export let ChatContextProvider=({children})=>{

    let {currentUser}=useAuthContext();
    const INITIAL_STATE={
        chatId:"null",
        user:{}
    }
    const chatReducer=(state, action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId:  currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,
                }
                default:
                    return state;
        }

    };
   
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

return(
<chatContext.Provider value={{data:state, dispatch}}>
    {children}
 </chatContext.Provider>


)
}