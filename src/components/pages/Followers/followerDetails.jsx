import React, { useEffect, useState } from 'react'
import classes from './index.module.css'
import Nav from '../../Nav'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

const FollowersDetails = () => {
    const [userId, setUserID] = useState(null);
    const [followingNames, setFollowingNames] = useState([]);

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
                                            resolve(userData.name);
                                        } else {
                                            resolve(null);
                                        }
                                    });
                                });
                            });
                            Promise.all(promises).then((names) => {
                                const filteredNames = names.filter((name) => name !== null);
                                setFollowingNames(filteredNames);
                            });
                        } else {
                            setFollowingNames([]);
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
        <h1>Total Followers: {followingNames.length}</h1>
        {followingNames.map((name, index) => (
            <div className={classes.container} key={index}>
                <h2>{name}</h2>
                <p>{}</p>
            </div>
        ))}
    </>
  )
}

export default FollowersDetails