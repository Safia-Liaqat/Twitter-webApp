import React, { useEffect, useState } from 'react'
import Nav from '../../Nav'
import "./index.css"
import Profile from '../../Profile'
import Tweets from '../../Tweets'
import NewTweet from '../../NewTweet'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../../../firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../Loader'

const Home = () => {
  const [userData,setUserData]=useState()
  const [userId, setUserID]=useState(null);
  const [newTweetTitle, setNewTweetTitle]=useState("")
  const [newTweetDesc, setNewTweetDescr]=useState("")
  const [tweetData,setTweetData]=useState([])
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [IsUserOnHome,setIsUseronHome]=useState(true)

  const params=useParams()
  const {paramId}=params   
   const router=useNavigate()

 useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setLoggedIn(true);
      if (paramId && paramId !== uid) {
        setIsUseronHome(false);
      }
      if (paramId) {
        const db = getDatabase();
        const userRef = ref(db, "users/" + paramId);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (!data) {
            router("/home");
            setUserID(uid);
          } else {
            setUserID(paramId);
          }
          console.log(data);
        });
      } else {
        setUserID(uid);
      }
    } else {
      router("/");
      console.log("User is NOT logged in!");
    }
  });
}, []);

  useEffect(()=>{
    const db=getDatabase();
    const userDataRef=ref(db,'users/'+ userId)
    onValue(userDataRef,(snapshot)=>{
      const data=snapshot.val()
    //  console.log(data)
      setUserData(data)
      if (data?.tweets) {
        const tweets = data.tweets;
        const tweetsList = [];
        for (const tweet in tweets) {
          tweetsList.push(tweets[tweet]);
        }

        setTweetData(tweetsList);
      }
    })
  },[userId])
  
 const sendNewTweet=(e)=>{
  e.preventDefault()
  if(!newTweetTitle.trim() || !newTweetDesc.trim()){
    alert("one of the field is empty")
    return;
  }
  const db=getDatabase();
  const tweetRef=ref(db,'users/'+ userId + "/tweets");
  const NewTweetRef=push(tweetRef);
  set(NewTweetRef,{
    title:newTweetTitle,
    description:newTweetDesc,
    date:new Date().getTime(),
    likes:0
  })
  toast.success("New Tweet Created");
  setNewTweetTitle("")
  setNewTweetDescr("")

 }
  return (
   <>
   {isLoggedIn ? (
     <>
     {userData ==null ? (<Loader/>) :
     (
      <> 
      <Nav/>
     <div className='container'>
        <Profile isUserOnHome={IsUserOnHome} info={userData}  paramId={paramId}/>
       {IsUserOnHome &&  (
       <NewTweet sendNewTweet={sendNewTweet} title={newTweetTitle} setTitle={setNewTweetTitle} desc={newTweetDesc} setDesc={setNewTweetDescr}/>  
      ) }

        {  
         tweetData.map((tweetItems, index)=>{
           return <Tweets  key={index} tweetItems={tweetItems} />
         })    
        }
        
     </div>
     <ToastContainer />
      </>
     )
     }


   </> ) : null
   }
   </>
  )
}

export default Home