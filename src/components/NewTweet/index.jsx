import React from 'react'
import './index.css'

const NewTweet = ({title,setTitle,desc,setDesc,sendNewTweet}) => {
   //const {title,description,date,likes}=TweetData;
  return (
    <form className='tweet' onSubmit={(e)=>sendNewTweet(e)}>
      <input  type='text' placeholder='Tweet Title' onChange={(e)=>setTitle(e.target.value)}/>
      <textarea  type='text' placeholder='Tweet description' onChange={(e)=>setDesc(e.target.value)}/>
      <input  value={'Add tweet'} className='btn' type='submit'/>
      {/* 
      <h2 className='tweet-header'>{title}</h2>
       <div className='tweet-body'>
        {desc}
       </div>
       <div className='divider'></div>
       <div className='tweet-stats'>
         <p>{date}</p>
         <p>{likes}</p>
       </div>
      */}
       

    </form>
  )
}

export default NewTweet