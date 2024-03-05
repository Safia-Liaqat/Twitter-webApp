import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Nav from '../../Nav';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { auth } from '../../../firebase'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const navigate = useNavigate();
  const [name,setName]=useState('name');
  const [description, setDescription]=useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit ...');
  const [oldPassword,setOldPassword]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [confirmbtn, setConfirmBtn]=useState(false)
  const [userData, setUserData] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const db = getDatabase();
        setUserID(uid);
        const userDataRef = ref(db, "users/" + uid);
        onValue(userDataRef, (snapshot) => {
          const data = snapshot.val();
          setName(data.name);
          setDescription(data.bio);
          setUserData(data);
          // console.log(data);
        });

        setLoggedIn(true);
      } else {
        navigate("/");
        console.log("User is NOT logged in!");
      }
    });
  }, []);


  const submitBasicInfo = () => {
    const { followers = 0, followings = 0, tweets = 0 } = userData || {};
    console.log('**************')
    console.log(followers, followings, tweets);
    const updatedUserData = {
      name,
      bio: description,
      followers,
      followings,
      tweets,
    };

    try {
      const db = getDatabase();
      const userRef = ref(db, "users/" + userID);
      set(userRef, updatedUserData);
      toast.success("User Information Updated");
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div>
      {isLoggedIn && (
        <>
      <Nav/>
    <div className={classes.container}>
      
      <h2 className={classes.heading}>Update Basic Info</h2>
      <form >
            <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type='button' value={'update info'} className={classes.btn} onClick={()=> setConfirmBtn(true)}/>
            {
              confirmbtn && (
                <div className={classes.update_btn}>
                <input type='button' onClick={submitBasicInfo} value={'Yes'} className={classes.btn_accept} />
                <input type="button" value={'No'} className={classes.btn_deny} onClick={()=> setConfirmBtn(false)} />
                </div>
              ) 
            }
            
        </form>
      
       
      <h2 >Update Password</h2>
      <form >
            <input type='text' value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} />
            <input value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} />
            <input type='text' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <input type='button'  value={"Update Password"} className={classes.btn}/>
        </form>
        <ToastContainer />
        
    </div>
      </>
      )}
    </div>
  )
}

export default Settings