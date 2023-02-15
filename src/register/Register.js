import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../firebase/Firebase';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Register() {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        navigate('/login');
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('formWrapper')}>
                <span className={cx('logo')}>Lama Chat</span>
                <span className={cx('title')}>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="displayName" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="file" style={{ display: 'none' }} id="file" />
                    <label htmlFor="file">
                        <FontAwesomeIcon className={cx('icon')} icon={faImage} />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>sign up</button>
                    {err && <span>something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
