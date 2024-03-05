import React, { useEffect, useState } from 'react'
import Login from '../../Login/Index'
import Register from '../../Register/Index'
import './index.css'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const router=useNavigate()
  const [Auth,IsAuth]=useState(true)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
     if(user){
      router('/home')
     }
     else{
      console.log("user is not logged in")
      IsAuth(false)
     }
    })
  },[])
  const [isRegister,setIsRegistr]=useState(true)
  const switchRegisterState=()=>{
    setIsRegistr(!isRegister)
  }
  return (
    <>
    {
      !Auth ? (
        <div className='Container'>
      {isRegister ? <Login switchState={switchRegisterState}/>: <Register switchState={switchRegisterState}/>}
    </div>
      ) : ""
    }
    </>
  )
}

export default Auth