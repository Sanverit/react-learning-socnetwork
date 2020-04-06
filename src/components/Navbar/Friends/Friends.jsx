import React from 'react';
import Friend from './Friend/Friend'
import s from './Friends.module.css';

function Friends(props){
    const {sideBar} = props;
    return (
        <div className={s.friendsBar}>
            <h3 className={s.title}>Friends</h3>
            <div className={s.friendAvaLogos}>
                { sideBar.friends.map(item => <Friend key={item.id} friend={item} />) }
            </div>
        </div>
    )
}

export default Friends;