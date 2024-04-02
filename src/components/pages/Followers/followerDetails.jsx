import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Link } from 'react-router-dom';

const FollowersDetails = () => {
    const [userId, setUserID] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const [profileId,setProfileId]=useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const uid = user.uid;
                    setUserID(uid);
                    const db = getDatabase();
                    const userDataRef = ref(db, 'users/' + uid + '/followers');
                    onValue(userDataRef, (snapshot) => {
                        const data = snapshot.val();
                        console.log(data)
                        if (data) {
                            const followingIds = Object.values(data).map((obj) => obj.userfollower);
                            const promises = followingIds.map((id) => {
                                return new Promise((resolve, reject) => {
                                    const userRef = ref(db, 'users/' + id);
                                    onValue(userRef, (snapshot) => {
                                        const userData = snapshot.val();
                                        if (userData && userData.name) {
                                            resolve({ id, name: userData.name, photo:userData.photo });
                                        } else {
                                            resolve(null);
                                        }
                                    });
                                });
                            });
                            Promise.all(promises).then((data) => {
                                const filteredData = data.filter((user) => user !== null);
                                setFollowingData(filteredData);
                            });
                        } else {
                            setFollowingData([]);
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
             <div className={classes.followerheding}>
            <h3 >Total Followers: {followingData.length}</h3>
            </div>
            {followingData.map(({ id, name, photo }, index) => (
                <Link to={`/home/${id}`} className={classes.link}>
                    <div className={classes.container} key={index}>
                <div>
                    <img src={photo} alt="" className="user-image"/>
                </div>
                    <div className={classes.nameContainer}>
                      <div className='user-name'>
                      <h4 className='name'>{name}</h4>
                      </div>
                      <div className='user-handle'>@{name.replace(/\s/g, '')}</div>
                    </div>
                </div>
                </Link>
            ))}
        </>
    );
}

export default FollowersDetails;
