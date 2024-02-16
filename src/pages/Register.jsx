import {useState} from 'react'
import { Link } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { auth} from '../firebase';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
function Register() {
    let [err, seterr]=useState(false);
    const db=getFirestore(app);
    let navigate=useNavigate();
const handleSubmit= async (e)=>{

    e.preventDefault();
  
    // console.log(e.target[3].files[0]);
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

    try{
      navigate("/loader");
   let response=await createUserWithEmailAndPassword(auth, email, password);
//    let data=await response.json();
  //  console.log(response);



   const date = new Date().getTime();   
const storageRef = ref(storage, `${displayName + date}`);
const uploadTask = uploadBytesResumable(storageRef, file);
// console.log(uploadTask);

uploadTask.then(() => {
  // navigate("/loader");
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //   console.log('File available at', downloadURL);
        await updateProfile(response.user,{
            displayName,
            photoURL:downloadURL
        });
        await setDoc(doc(db, "users", response.user.uid), {
            uid:response.user.uid,
            displayName,
            email,
            photoURL:downloadURL,
            
          });
          await setDoc(doc(db, 'userChats', response.user.uid), {});
          navigate('/');

    });
  }
  
);


    }catch(err){
            seterr(err);

    }
    

}




  return (
    <>
     <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Vaarta</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" autoComplete='username' />
          <input required type="password" placeholder="password" autoComplete='current-password' />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <AddPhotoAlternateIcon/>
            <span>Add an avatar</span>
          </label>
          <button >Sign up</button>
         
            {err?<span>Something went wrong</span>:""}
        </form>
        <p>
          You do have an account? <Link to="/login" ><span>Login</span></Link>
        </p>
      </div>
    </div>
    
    </>
  )
}

export default Register