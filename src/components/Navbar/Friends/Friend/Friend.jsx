import React from 'react';
import s from './Friend.module.css';

function Friend(props){
    const {friend} = props;
    return (
        <div className={s.friendItem}>
            <img className={s.avatar} src={friend.avaFriend} alt=""/>
            <div className={s.name}>
                <span>{friend.name}</span>
            </div>
        </div>
    )
}

export default Friend;