import React, { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from  '../../firebase'

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
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            console.log(data);
          } else {
            console.error('User not found');
          }
        });
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
    fetchUserDetails();
  }, [paramId]);

  useEffect(() => {
    // Fetch user details based on paramId
    const fetchUserDetails = async () => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${paramId}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            console.log(data);
            // Update the followers state with the data from the database
            if (data.followers) {
              const followerValues = Object.values(data.followers);
              const isId=followerValues.some(item => item.userfollower === userprofileId)
              if (isId) {
                setIsFollowing(false)
                console.log('isFollowing',isFollowing)
              } 
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
  }, [paramId]);
  
  

  const followHandler =async () => {
    const db = getDatabase();
    if (!isFollowing) {
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
    }
    setIsFollowing(true);
    console.log("is following",isFollowing)  
  };

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
        <div>
          <h3>Followers</h3>
          <p>{Object.keys(userInfo.followers).length}</p>
        </div>
        <div>
          <h3>Following</h3>
          <p>{Object.keys(userInfo.followings).length}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
