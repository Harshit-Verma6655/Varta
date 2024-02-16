/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
let authContext=createContext();

export let useAuthContext=()=>{

    return useContext(authContext);
}

export let AuthContextProvider=({children})=>{

    let [currentUser, setCurrentUser]=useState(null);
    useEffect(()=>{
        let unsub=onAuthStateChanged(auth,(user)=>{
            console.log(user);
            setCurrentUser(user);
        });
        return ()=>{
            unsub();
        }
    },[])


return(
<authContext.Provider value={{currentUser, setCurrentUser}}>
    {children}
 </authContext.Provider>


)
}