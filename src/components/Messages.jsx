
import {useState, useEffect} from 'react'
import Message from './Message'
import { useChatContext } from '../ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
function Messages() {
  const [messages, setMessages]=useState([]);
  const {data}=useChatContext();

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // console.log(data);
      // console.log("Current data: ", doc.data());
       doc.exists() &&  setMessages(()=>doc.data().messages)
  });


  
   
  
  return () => {
    unSub();
  };


  },[data.chatId, messages])
  return (
   <>
   <div className='messages'>
    {messages.map(msg=><Message msg={msg} key={msg.id}/>)}

   </div>
   
   </>
  )
}

export default Messages