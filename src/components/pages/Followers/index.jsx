import React from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
const Followers = () => {
    const followers=[
        {
            name:'Safia Liaqat',
            handler:"@Safia"
        },
        {
            name:'Ahmad Hassan',
            handler:"@Ahmad"
        },
        {
            name:'Saba Liaqat',
            handler:"@Saba"
        },
        {
            name:'Rafia Liaqat',
            handler:"@Rafia"
        },
        {
            name:'Hussain Muhayudin',
            handler:"@Husaain"
        }
    ]
  return (
    
    <>
    <Nav/>
    
    {
        followers.map((follower,index)=>{
            return <div className={classes.container}>
            <h2>{follower.name}</h2>
            <p>{follower.handler}</p>
        </div>
        })
    }
    
    </>
  )
}

export default Followers