import React, { useState } from 'react'
import './index.css'
import {signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup,} from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

function Login({switchState}) {
  const router=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error, setError] = useState('');

  const provider = new GoogleAuthProvider();

  const validateForm = () => {
    if (!email || !password) {
      // Display an error message or toast indicating that both fields are required
      return false;
    }
    return true;
  };

  const onGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler=async (e)=>{
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const login=await signInWithEmailAndPassword(auth,email,password)
      console.log(login.user.uid)
      router('/home')
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }
  return (
    <div className='login'>
        <h1>Login to your account</h1>
        <form className='login_form' onSubmit={loginHandler}>
        {error && <p className='error-message'>{error}</p>}
            <input className='input-field' type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input className='input-field' type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <input className='input-btn' onClick={onGoogleLogin} type='button' value={'Sign In with Google'}/>
            <input className='input-btn' type='submit' value={'Sign In'}/>
        </form>
        <p onClick={switchState}>Don't have an account, Register</p>
    </div>
  )
}

export default Login