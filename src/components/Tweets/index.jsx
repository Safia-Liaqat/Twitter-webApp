import React from 'react'
import './index.css'

const Tweets = ({tweetItems}) => {
   const {title,description,date,likes}=tweetItems;
  return (
    <div className='tweet'>
       <h2 className='tweet-header'>{title}</h2>
       <div className='tweet-body'>
        {description}
       </div>
       <div className='divider'></div>
       <div className='tweet-stats'>
         <p>
         {`${new Date(
          date
        ).getDate()}-${new Date(date).getMonth()}-${new Date(
          date
        ).getFullYear()}    ${new Date(date).getHours()}:${new Date(
          date
        ).getMinutes()}`}
         </p>
         <p>{likes}</p>
       </div>
    </div>
  )
}

export default Tweets