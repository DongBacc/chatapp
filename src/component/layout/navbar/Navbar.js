import { useContext } from 'react';
import { AuthContext } from '../../../authContext/AuthContext';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>Lama chat</div>
            <div className={cx('user')}>
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button>
                    <Link to="/login">Login</Link>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
