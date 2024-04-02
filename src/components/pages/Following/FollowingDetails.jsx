import React, { useEffect, useState } from 'react';
import classes from './index.module.css';
import Nav from '../../Nav';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Link } from 'react-router-dom';

const FollowingDetails = () => {
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
                    const userDataRef = ref(db, 'users/' + uid + '/followings');
                    onValue(userDataRef, (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            const followingIds = Object.values(data).map((obj) => obj.userfollowing);
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
        <div>
            <div className={classes.followingheding}>
            <h3 >Total Following: {followingNames.length}</h3>
            </div>
            {followingNames.map(({ id, name, photo }, index) => (
                <Link to={`/home/${id}`} className={classes.link} >
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
        </div>
    );
};

export default FollowingDetails;
