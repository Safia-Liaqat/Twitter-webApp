import React, { useEffect, useState } from 'react'
import './index.css'
import { useParams } from 'react-router-dom';
import { getDatabase, onValue, push, ref, set } from 'firebase/database'

const Profile = ({info,  isUseronHome , userProfileId}) => {
  const [userId, setUserID]=useState(null);
  const [follower,setFollower]=useState(0)
  const [following,setFollowing]=useState(0)
  const [userInfo, setUserInfo] = useState({
    name: "",
    followers: {},
    followings: {},
    bio: "",
  });
  const params=useParams()
  const {paramId}=params
  console.log('profile')
  console.log(userProfileId)

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

  const followHandler = () => {
    let followerCount=setFollower(follower +1);
    let followingrCount=setFollowing(following +1);
     const db = getDatabase();
     const followingRef = ref(db, "users/" + paramId + "/followings");
     const followerRef = ref(db, "users/" + userProfileId + "/follower");
     const newFollowingRef = push(followingRef);
     const newFollowerRef = push(followerRef);
     set(newFollowingRef, {
      follower:followerCount
     });
     set(newFollowerRef, {
      following:followingrCount
     });
  

   
   
  
  };

  return (
    <div className='profile'>
          <div className='profile-cover'>
            ...
          </div>
          <div className='profile-basics'>
            <div className='profie-image'></div>
            <div className='profile-basics-details'>
            <h2 className='profile-name'>{userInfo.name}</h2>
            <p className='profile-handle'>@{userInfo.name}</p>
            </div>
            {
              paramId ? (
                <> 
                <button onClick={followHandler} className="btn-follow">
              Follow
           </button>
            </>
              ) : null
            }
          </div>
          <div className='profile-bio'>
          {userInfo.bio}
          </div>
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
  )
}

export default Profile