import React from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
const Followings = () => {
    const following=[
        {
            name:'Andrew',
            handler:"@Andrew"
        },
        {
            name:'Andrew',
            handler:"@Andrew"
        },
        {
            name:'Andrew',
            handler:"@Andrew"
        },
        {
            name:'Andrew',
            handler:"@Andrew"
        },
        {
            name:'Andrew',
            handler:"Andrew"
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