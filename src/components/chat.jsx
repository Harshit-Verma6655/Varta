/* eslint-disable no-unused-vars */
import React from 'react'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Messages from './Messages';
import Typebox from './Typebox';
import { useChatContext } from '../ChatContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';
export function Chat() {
  let navigate=useNavigate();
  const {data}=useChatContext();
  // console.log(data);
  return (
    <div className="chat">
      
      <div className='chatinfo'>
        <div className='info'>
          <div onClick={()=>{
            navigate("/");
          }}>
        <ChevronLeftIcon />
        </div>
          {data.user.photoURL && <img src={data.user?.photoURL}></img>}
        <span>{data.user?.displayName}</span>
        </div>
        <div className='icons'>
        <VideoCameraFrontIcon/>
        <PersonAddAlt1Icon/>
        </div>
      </div>
      <Messages/>
      <Typebox/>


    </div>
  )
}

export default Chat