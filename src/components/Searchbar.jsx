import  { useState } from 'react'
import { useAuthContext } from '../authContext';
import { collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc, } from 'firebase/firestore';
import { db } from '../firebase';
// import { useNavigate } from 'react-router-dom';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


function Searchbar() {
  const [user, setUser]=useState();
  const {currentUser}=useAuthContext();
  const [err, setErr]=useState();
  const [username, setUsername] = useState("");
  // let navigate=useNavigate();
const handleSearch= async ()=>{
// const combinedId=currentUser.uid>useAuthContext.uid?(currentUser.uid+useAuthContext.uid) :(useAuthContext.uid+currentUser.uid);
const q = query(collection(db, "users"), where("displayName", "==", username));
try {
  const querySnapshot = await getDocs(q);
  // console.log("query snap----",querySnapshot);
  querySnapshot.forEach((doc) => {
    setUser(doc.data());
    // console.log("doc data----",doc.data());
  });
} catch (err) {
  setErr(true);
}

};


  const handleKeyDown =(e)=>{
    e.preventDefault();
     handleSearch();

   
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(err);
    }

    setUser(null);
    setUsername("");
    // navigate("/chat");
    
  };

  return (
    <>
    
    <div className="searchbar">
      <form onSubmit={handleKeyDown}>
        <input type="text" placeholder="Find a user"
       
        onChange={(e)=>setUsername(e.target.value)}
        value={username}
        ></input>
        <button type='submit'><PersonSearchIcon /></button>
        </form>

      {err && <span>User not found!</span>}
      {user && (
        <div className="people" onClick={handleSelect} >
          <img src={user.photoURL} alt="" />
          <div className="peoplename">
            <span className='name'>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Searchbar