import classNames from 'classnames/bind';
import Search from '../search/Search';
import Navbar from '../navbar/Navbar';
import styles from './Sidebar.module.scss';
import Chats from './Chats';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
