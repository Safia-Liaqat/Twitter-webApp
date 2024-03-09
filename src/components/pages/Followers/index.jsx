import React from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
const Followers = () => {
    const followers=[
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