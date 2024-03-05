import React from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
const Followings = () => {
    const following=[
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
        following.map((following,index)=>{
            return <div className={classes.container}>
            <h2>{following.name}</h2>
            <p>{following.handler}</p>
        </div>
        })
    }
    
    </>
  )
}

export default Followings