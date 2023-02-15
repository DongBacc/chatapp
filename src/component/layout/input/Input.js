import { useContext, useState } from 'react';
import { faImages, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { AuthContext } from '../../../authContext/AuthContext';
import { ChatContext } from '../../../authContext/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/Firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const cx = classNames.bind(styles);

function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                },
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp(),
        });

        setText('');
        setImg(null);
    };
    return (
        <div className={cx('wrapper')}>
            <input value={text} placeholder="Type something... " onChange={(e) => setText(e.target.value)} />
            <div className={cx('send')}>
                <FontAwesomeIcon className={cx('icon')} icon={faPaperclip} />
                <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <FontAwesomeIcon className={cx('icon')} icon={faImages} />
                </label>
                <button type="" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Input;
