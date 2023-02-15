import { faVideoCamera, faUser, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Messages from '../message/Messages';
import Input from '../input/Input';

import styles from './Chat.module.scss';
import { useContext } from 'react';
import { ChatContext } from '../../../authContext/ChatContext';

const cx = classNames.bind(styles);
function Chat() {
    const { data } = useContext(ChatContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chatInfo')}>
                <span>{data.user?.displayName}</span>
                <div className={cx('chatIcons')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faVideoCamera} />
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <FontAwesomeIcon className={cx('icon')} icon={faEllipsis} />
                </div>
            </div>
            <Messages />
            {/* inpput */}
            <Input />
        </div>
    );
}

export default Chat;
