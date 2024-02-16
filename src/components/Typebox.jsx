import  { useState } from 'react'
// import attach from '../images/attach.png';
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import { useAuthContext } from '../authContext';
import { useChatContext } from '../ChatContext';
import { db, storage } from '../firebase';
import{v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function Typebox() {
  const [text, setText]=useState();
  const [img, setImg]=useState();
  const {currentUser}=useAuthContext();
  const {data}=useChatContext();
  const handleSend= async()=>{
    if(!text && !img){
      return;
    }

      if(img){

        const storageRef=ref(storage, uuid());
        const uploadTask=  uploadBytesResumable(storageRef, img);
        uploadTask.then(
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log(downloadURL);
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
          }
        )
      }
        )
    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    }
    // const userRef=doc(db, "userChats", currentUser.uid);
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp()

  });

  await updateDoc(doc(db, "userChats", data.user.uid), {
    [data.chatId+".lastMessage"]:{
      text,
    },
    [data.chatId+".date"]:serverTimestamp()

});

    setText("");
    setImg(null);

    
  }

  return (
    <>
    <div className='box'>
        <textarea placeholder='Type something...'
        onChange={(e)=>{
         
          setText(e.target.value)}}
        value={text}
        />

        
        <div className='send'>
        {/* <img src={attach} alt='attached'/> */}
        <input type='file' style={{display:'none'}} id='file'
        onChange={(e)=>setImg(e.target.files[0])}
        
        />
        <label htmlFor='file'>
        <AddPhotoAlternateIcon style={{fontSize:"large"}}/>
        </label>
        <button
        onClick={handleSend}
        ><SendIcon style={{fontSize:"medium"}}/></button>
        </div>
    </div>
    
    
    </>
  )
}

export default Typebox