import { useState, useEffect, useContext } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Inbox from './Inbox';
import { db } from '../../../firebase/Firebase';
import { ChatContext } from '../../../authContext/ChatContext';

const cx = classNames.bind(styles);

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    //console.log(messages);
    return (
        <div className={cx('messages')}>
            {messages.map((mess) => {
                return <Inbox message={mess} key={mess.id} />;
            })}
        </div>
    );
}

export default Messages;
