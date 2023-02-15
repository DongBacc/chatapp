import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar';

const cx = classNames.bind(styles);
function Layout() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('component')}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Layout;
