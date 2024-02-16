import  { useEffect, useState } from 'react'

import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useAuthContext } from '../authContext';
import { useChatContext } from '../ChatContext';
import { useNavigate } from 'react-router-dom';
function People() {
  let [chats, setChats]=useState();
  let{currentUser}=useAuthContext();
  let { dispatch }=useChatContext();
    let navigate=useNavigate();
  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log(doc.data());
      });

      


      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();

  },[currentUser.uid]);

  const handleClick=(user)=>{
    // console.log("user---payload", user);
    dispatch({ type: "CHANGE_USER", payload: user });
    navigate("/login");

  }
  return (
    <>
    {!chats?<div></div>:Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat)=>{
      return ( <div className="people" key={chat[0]}   
      onClick={()=>handleClick(chat[1].userInfo)}

      >
      <img src={chat[1].userInfo.photoURL} alt=""/>
      <div className="peoplename">
          <div className="name">{chat[1].userInfo.displayName}</div>
          <div className='msg'>{chat[1].lastMessage?.text}</div>            
      </div>
  </div>)
    })}
   
    </>
  )
}

export default People