import LogoutIcon from '@mui/icons-material/Logout';
import Nav from './navbar';
import Searchbar from './Searchbar';
import People from './People';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export function Sidebar(){
    let navigate=useNavigate();
    return <>
      <div className="sidebar">
       <Nav/>
        <Searchbar/>
        <div className="peopleBox">
        <People/>
        
     
        </div>
        
        
        <div className="logout">
            
            <button  onClick={()=>{signOut(auth)
            navigate("/");
        }
            }>Logout
            <LogoutIcon style={{fontSize:"small"}}/></button>
        </div>
    </div>
    
    </>
}