import React, { useEffect, useState } from 'react'
import './index.css'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from  '../../../firebase'
import Nav from '../../Nav'

const FindFollowers = () => {
    const [userData, setUserData] = useState({});
    const [userList, setUserList] = useState([]);
    const [userId,setUserId]=useState(null)

 useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userid = user.uid;
        setUserId(userid);
        console.log(userid); // Move this line here
      }
    });
  }, []);
  
  useEffect(() => {
    const db = getDatabase();
    const userDataRef = ref(db, 'users/');
    onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setUserData(data);
  
      if (data?.name) {
        const userName = data.name;
        const newList = [];
        for (const user in userName) {
          newList.push(userName[user]);
        }
  
        setUserList(newList);
      }
    });
  }, []);

    
  return (
    <div>
        <Nav/>

    {  
  Object.values(userData).map((userItem, index) => {
    return (<div className='user-container'>
    <div className="name-container">
    <div className='user-name'>
        {userItem.name}
   </div>
   <div className='user-handle'>@{userItem.name}</div>
    </div>
    
   <div className="follow">
     <button className='follow-btn'>Follow</button>
   </div>
</div> );
  })    
}
    </div>
  )
}

export default FindFollowers