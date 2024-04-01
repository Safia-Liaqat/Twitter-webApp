import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import FollowersDetails from './followerDetails';

const Followers = () => {
    return (
        <>
        <Nav />
        
        <FollowersDetails/>
    </>
  )
}

export default Followers