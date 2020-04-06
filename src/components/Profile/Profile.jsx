import React from 'react'

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

function Profile({profile, isOwner, savePhotoProfile}){
    return (
        <div>
            <ProfileInfo isOwner={isOwner} profile={profile} savePhotoProfile={savePhotoProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;