import React, { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from  '../../firebase'
import { Button, Modal } from 'react-bootstrap';
import MyModal from '../../Modals/FollowersModal';
import FollowingModal from '../../Modals/FollowingModal';
//import Example from './Example';

const Profile = ({ info, isUseronHome, paramId }) => {
 // const [follower, setFollower] = useState(0);
//  const [following, setFollowing] = useState(0);
  const [userprofileId,setUserProfileId]=useState(null)
  const [isFollowing,setIsFollowing]=useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    followers: {},
    followings: {},
    bio: '',
  });

  const [modalShow, setModalShow] = useState(false); // State variable to control modal visibility
  const [followingModalShow, setFollowingModalShow] = useState(false);
  const handleOpenModal = () => {
    setModalShow(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalShow(false);
  };  

  const handleOpenFollowingModal = () => {
    setFollowingModalShow(true);
  };

  const handleCloseFollowingModal = () => {
    setFollowingModalShow(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserProfileId(uid)
      } 
    });
  }, []);


  useEffect(() => {
    if (info) {
      if (!info.followers) {
        info.followers = {};
      }
      if (!info.followings) {
        info.followings = {};
      }
      setUserInfo(info);
    }
  }, [info]);


  console.log('paramID', paramId);

  useEffect(() => {
    // Fetch user details based on paramId
    const fetchUserDetails = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${paramId}`);
        
        // Use Promise to wait for both fetching data and checking followers
        const [snapshot] = await Promise.all([
          new Promise((resolve) => onValue(userRef, resolve)),
          // Add any other asynchronous operations if needed
        ]);
  
        const data = snapshot.val();
  
        if (data) {
          console.log(data);
  
          // Update the followers state with the data from the database
          if (data.followers) {
            const followerValues = Object.values(data.followers);
            const isId = followerValues.some((item) => item.userfollower === userprofileId);
  
            if (isId) {
              setIsFollowing(true);
            }
          }
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
  
    fetchUserDetails();
  }, [paramId, userprofileId]);
  

  useEffect(() => {
    // Fetch user details based on paramId
    const fetchUserDetails = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${paramId}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
       //     console.log(data);
            // Update the followers state with the data from the database
            if (data.followers) {
              const followerValues = Object.values(data.followers);
              const isId=followerValues.some(item => item.userfollower === userprofileId)
              if (isId) {
                setIsFollowing(true)
              
              } 
               console.log('isFollowing in dataFetching',isFollowing)
            //  else{setIsFollowing(false)}
              //setFollowers(followerValues);
            }
          } else {
            console.error('User not found');
          }
        });
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
    fetchUserDetails();
  }, [paramId, isFollowing]);
  
  
/*
  const followHandler =async () => {
    setIsFollowing(true);
    console.log("is following on button click",isFollowing)
    const db = getDatabase();
    
      const followerRef = ref(db, `users/${paramId}/followers`);
      const followingRef = ref(db, `users/${userprofileId}/followings`);
      const newFollowingRef = push(followingRef);
      const newFollowerRef = push(followerRef);
      
      set(newFollowerRef, {
        userfollower: userprofileId,
      });
      set(newFollowingRef, {
        userfollowing: paramId,
      });
      console.log('user added');   
      
  };
*/
const followHandler = async () => {
  const db = getDatabase();

  try {
    const followerRef = ref(db, `users/${paramId}/followers`);
    const followingRef = ref(db, `users/${userprofileId}/followings`);
    const newFollowingRef = push(followingRef);
    const newFollowerRef = push(followerRef);

    // Wait for the database operations to complete
    await Promise.all([
      set(newFollowerRef, { userfollower: userprofileId }),
      set(newFollowingRef, { userfollowing: paramId }),
    ]);

    // After the database operations are completed, update the state
    setIsFollowing(true);
    console.log('User added to followers and followings');
  } catch (error) {
    console.error('Error adding user to followers and followings', error);
  }
};

  useEffect(() => {
    console.log("is following in useEffect", isFollowing);
  }, [isFollowing]);

  return (
    <div className='profile'>
      <div className='profile-cover'>...</div>
      <div className='profile-basics'>
        <div className='profie-image'></div>
        <div className='profile-basics-details'>
          <h2 className='profile-name'>{userInfo.name}</h2>
          <p className='profile-handle'>@{userInfo.name}</p>
        </div>
        {paramId ? (
          <>
          {isFollowing ? <span className='following'>Following</span> : (
            <>
            <button onClick={followHandler} className='btn-follow'>
              Follow 
            </button>
             </>
          )}
            
          </>
        ) : null}
      </div>
      <div className='profile-bio'>{userInfo.bio}</div>
      <div className='profile-stats'>
        <div onClick={handleOpenModal} style={{cursor:'pointer'}}>
          <h3>Followers</h3>
          <p>{Object.keys(userInfo.followers).length}</p>
        </div>
        <div onClick={handleOpenFollowingModal} style={{cursor:'pointer'}}>
          <h3>Following</h3>
          <p>{Object.keys(userInfo.followings).length}</p>
        </div>
      </div>

      {/* Render the modal component */}
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <FollowingModal 
        show={followingModalShow}
        onHide={() => handleCloseFollowingModal(false)}
      />
     
      {/* Render the modal component */}
      
    </div>
  );
};

export default Profile;
