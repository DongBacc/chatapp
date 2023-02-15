import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('formWrapper')}>
                <span className={cx('logo')}>Lama Chat</span>
                <span className={cx('title')}>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button>sign up</button>
                    {err && <span>something went wrong</span>}
                </form>
                <p>
                    You don't have an account?<Link to="/"> Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
