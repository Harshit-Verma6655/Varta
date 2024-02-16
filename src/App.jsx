
import  Home  from "./pages/Home"
import './App.css';
import Login from "./pages/Login"
import {Loader} from './components/Loader'
import Register from './pages/Register';
import{Routes, Route} from 'react-router-dom';
import { useAuthContext } from "./authContext";
// import { Chat } from "@mui/icons-material";
import {ChatBar} from './pages/ChatBar'
function App() {
  let {currentUser}=useAuthContext();

// console.log(currentUser);
  return <>
  <Routes>

  <Route path='/' element={!currentUser?<Login/>:<Home/>}/>
 
  {/* <Route path='/home' element={<Home/>}/> */}
      

  <Route path='/register' element={<Register/>}/>
  <Route path='/login' element={currentUser?<ChatBar/>:<Login/>}/>
  <Route path='/loader' element={<Loader/>}/>
 
  </Routes>
 
  </>
}

export default App
