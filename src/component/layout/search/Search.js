import { useContext, useState } from 'react';
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/Firebase';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { AuthContext } from '../../../authContext/AuthContext';

const cx = classNames.bind(styles);
function Search() {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(collection(db, 'users'), where('displayName', '==', userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (err) {}

        setUser(null);
        setUserName('');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('searchInput')}>
                <input
                    value={userName}
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className={cx('userChat')} onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className={cx('userChatInfo')}>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
