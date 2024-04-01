import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import Nav from '../../Nav';
import FollowingDetails from './FollowingDetails';

const Followings = () => {
    
    return (
        <>
            <Nav />
             <FollowingDetails/>
        </>
    );
};

export default Followings;
