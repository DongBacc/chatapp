import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { AuthContext } from '../../../authContext/AuthContext';
import { ChatContext } from '../../../authContext/ChatContext';
import { db } from '../../../firebase/Firebase';

const cx = classNames.bind(styles);

function Chats() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    console.log(currentUser);
    console.log(Object.entries(chats));
    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };
    return (
        <div className={cx('chats')}>
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div className={cx('userChat')} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className={cx('userChatInfo')}>
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Chats;
