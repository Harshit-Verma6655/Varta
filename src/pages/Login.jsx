
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Login() {
  let [err, seterr]=useState();
      let navigate=useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const email=e.target[0].value;
      const password=e.target[1].value;
      try{
        navigate("/loader");
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }catch(err){
        seterr(err);
      }
  }



  return (<>
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Vaarta</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" autoComplete='username'/>
          <input type="password" placeholder="password" autoComplete='current-password'/>
          <button >Sign in</button>
          { <span>{err}</span>}
        </form>
        <p>You dont have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    </>
  )
}

export default Login;