import React, { useEffect, useState } from 'react'
import './index.css'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from  '../../../firebase'
import Nav from '../../Nav'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const FindFollowers = () => {
    const [userData, setUserData] = useState({});
    const [userList, setUserList] = useState([]);
    const [UserId,setUserId]=useState(null)
    const [userParamId, setUserParamId]=useState('')
    const [followingStates, setFollowingStates] = useState({});

    const router=useNavigate()

 useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userid = user.uid;
        setUserId(userid);
        console.log('userid',UserId); // Move this line here
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
  
      if (data) {
        const userIds = Object.keys(data);
      //  console.log('User IDs:', userIds);

       // Retrieve the follow states from localStorage
       const storedFollowingStates = JSON.parse(localStorage.getItem('followingStates')) || {};
       setFollowingStates(storedFollowingStates);

        // To get an array of user objects with their IDs
          const userListWithIds = userIds.map((userId) => {
           // Check if the current userId is the one you want to exclude
           if (userId ===UserId ) {
             return null; // Exclude this user from the list
           }

               // Include other users as usual
                   return { id: userId, ...data[userId] };
                })
            .filter(user => user !== null); // Filter out null entries

        setUserList(userListWithIds);
        const updatedFollowingStates = userIds.reduce((acc, userId) => {
          acc[userId] = storedFollowingStates[userId] || false;
          return acc;
        }, {});
    
         // Retrieve the follow states from localStorage
         const storedFollowingState = JSON.parse(localStorage.getItem('followingStates')) || {};
        setFollowingStates(storedFollowingState);
         
      }
    });
    console.log('user List',userList)
  }, [UserId]);

  // This follow handler functionality is excluded for now
  /*
  const NavigateToProfile=async (userItem)=>{
    const paramId=userItem.id
    // console.log('user Item',userItem.id)
     const db = getDatabase();

  try {
    const followerRef = ref(db, `users/${paramId}/followers`);
    const followingRef = ref(db, `users/${UserId}/followings`);
    const newFollowingRef = push(followingRef);
    const newFollowerRef = push(followerRef);

    // Wait for the database operations to complete
    await Promise.all([
      set(newFollowerRef, { userfollower: UserId }),
      set(newFollowingRef, { userfollowing: paramId }),
    ]);
    console.log('follower data',followerRef)
    // After the database operations are completed, update the state
    setFollowingStates((prevStates) => ({ ...prevStates, [paramId]: true }));
    // Update localStorage with the new follow states
    localStorage.setItem('followingStates', JSON.stringify({ ...followingStates, [paramId]: true }));
    console.log('User added to followers and followings');
  } catch (error) {
    console.error('Error adding user to followers and followings', error);
  }
  }

  */
  return (
    <div>
        <Nav/>
        <div style={{textAlign:'center', marginBottom:'40px'}}>
        <h6>Click on the User to add him as a friend</h6>
      </div>
        {  
  Object.values(userList).map((userItem) => {
    const userIds = Object.keys(userData).find(key => userData[key] === userItem); // Get the corresponding user ID
   // setUserParamId(userId)
    return (
      <>
      <Link to={`/home/${userItem.id}`} className='navigate'>
       <div className='user-container' key={userIds}>
        <div >
        <img src={userItem.photo} className='user-image'/>
        </div>
        <div className="name-container" >
          <div className='user-name'>
            <h4>{userItem.name}</h4>
          </div>
          <div className='user-handle'>@{userItem.name.replace(/\s/g, '')}</div>
        </div>
        {
          /*
                <div className="follow">
          {
            followingStates[userItem.id] ? <span className='following'>Following</span> : (<>
            <button className='follow-btn' onClick={() => NavigateToProfile(userItem)}>Follow</button>
            </>)
          }
          
        </div>

          */
        }
             </div>
      </Link>
      </>
      
    );
  })    
}

    </div>
  )
}

export default FindFollowers