/* eslint-disable react/prop-types */
import {useRef, useEffect} from 'react'
import { useAuthContext } from '../authContext'
import { useChatContext } from '../ChatContext';
import { Link } from 'react-router-dom';
function Message({msg}) {
  const {currentUser}=useAuthContext();
  const {data}=useChatContext();
  const ref = useRef();
  

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    // console.log(msg.date);
  }, []);
  
  return (
    <>
    <div ref={ref}>
    <div
    
    className={msg.senderId===currentUser.uid?'owner':"message"}>
        
        <div className='messanger'>
        <img
          src={
            msg.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        </div>
      
        <div className='content'>
            <p>{msg.text}</p>
            {msg.img && <Link to={msg.img} target='_blank'><img src={msg.img} alt="" 
            
            
            /></Link>}
               
            
        </div>
       
        </div>
        </div>

        
   
    
    
    </>
  )
}

export default Message