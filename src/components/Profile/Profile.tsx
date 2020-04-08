import React from 'react'

import { DataProfileType } from '../../types/types'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

type PropsType = {
    profile: DataProfileType
    isOwner: boolean
    savePhotoProfile: () => void
}
function Profile({profile, isOwner, savePhotoProfile}: PropsType){
    return (
        <div>
            <ProfileInfo isOwner={isOwner} profile={profile} savePhotoProfile={savePhotoProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;