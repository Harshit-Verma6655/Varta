
import { useAuthContext } from "../authContext";

function Nav(){

    let {currentUser}=useAuthContext();

    return(<>
     <div className="navbar">
            <div className="logo">
                <span >Vaarta</span>
            </div>
            <div className="user">
                <img src={currentUser.photoURL?currentUser.photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBbirfM3TZm6EotKRPZw9_KwVdja9LTqlO6g&usqp=CAU"}/>
                <span>{currentUser.displayName}</span>
            </div>
            {/* <span>Chats</span> */}
            
        </div>
    
    
    </>)
}

export default Nav;