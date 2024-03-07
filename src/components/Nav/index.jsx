import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase/'

const Nav = () => {
  const navLinks=[
    {
      placeholder:"Home",
      path:"/",
      isLink:true
    },
    {
      placeholder:"Settings",
      path:"/setting",
      isLink:true
    },
    {
      placeholder:"Followers",
      path:"/home/followers",
      isLink:true
    },
    {
      placeholder:"Followings",
      path:"/home/followings",
      isLink:true
    },
    {
      placeholder:"Sign out",
      path:"/auth",
      isLink:false
    },
  ]
  const router =useNavigate()
  const Signout=()=>{
    signOut(auth).then(()=>{
      console.log('signed out')
      router('/auth')
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <nav>
        <h3 className='logo'>Edverser</h3>
    <ul>
    {navLinks.map((navlink, index) => (
          <li  key={index}>
            {navlink.isLink ? (
              <Link to={navlink.path}>{navlink.placeholder}</Link>
            ) : (
              <span onClick={Signout} style={{cursor:'pointer'}}>Signout</span>
            )}
          </li>
        ))}
    </ul>
</nav>
  )
}

export default Nav