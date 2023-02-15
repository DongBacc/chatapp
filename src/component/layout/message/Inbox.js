import { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../../authContext/AuthContext';
import { ChatContext } from '../../../authContext/ChatContext';
import './Inbox.scss';

function Inbox({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={(message.sendId = currentUser.uid ? currentUser.photoURL : data.user.photoURL)} alt="" />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
}

export default Inbox;
