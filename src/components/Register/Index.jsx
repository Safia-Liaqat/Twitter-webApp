import React, { useState } from 'react'
import './index.css'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'
import {getDatabase, ref, set} from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Register({switchState}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name,setName]=useState('')
  const [error, setError] = useState('')
  const router=useNavigate()
  

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return false
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    setError('')
    return true
  }


  const SubmitHandler=async (e)=>{
    e.preventDefault();
    if (!validateForm()) {
      return
    }
    try {
      const res=await createUserWithEmailAndPassword(auth, email,password)
      const imagesDirectory = [
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
        "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg",
        "https://images.pexels.com/photos/4412516/pexels-photo-4412516.jpeg",
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
      ];

      const coverPhoto=[
        "https://images.pexels.com/photos/3280216/pexels-photo-3280216.jpeg"  ,
        "https://images.pexels.com/photos/623919/pexels-photo-623919.jpeg"
      ]
      const db=getDatabase()
      set(ref(db, "users/" +res.user.uid),{
        name:name,
        photo:
        imagesDirectory[Math.floor(Math.random() * imagesDirectory.length)],
        coverPhoto:coverPhoto[Math.floor(Math.random() * coverPhoto.length)],
        bio:"Peace over everything",
        email:email,
        followers: {},
        followings: {},
        tweets:{},
      })
      toast.success("Success Notification !", {
        onClose: () => {
          // Redirect to home page after the toast is closed
          router('/');
        },
      });

    } catch (error) {
      console.log(error)
      setError('Registration failed. Please try again.')
    }
    
  }
  return (
    <div className='login'>
        <h1>Register your account</h1>
        <form className='login_form' onSubmit={SubmitHandler}>
        {error && <p className='error-message'>{error}</p>}
            <input className='input-field' type='name' placeholder='Your Name' onChange={(e)=>setName(e.target.value)} />
            <input className='input-field' type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input className='input-field' type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <input className='input-field' type='password' placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <input className='input-btn' type='submit' value={'Register'}/>
        </form>
        <p onClick={switchState} style={{marginTop:'20px'}}>Already have a account, <span style={{cursor:'pointer', fontWeight:'bold'}}>Login</span> </p>
        <ToastContainer />
    </div>
  )
}

export default Register