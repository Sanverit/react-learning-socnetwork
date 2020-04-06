import React from 'react'
import { Icon, Card } from 'semantic-ui-react'

import StatusContainerComponent from './Status/Status.container';
import StatusContainerComponentWithHooks from './Status/Status.containerWithHooks';
import s from './ProfileInfo.module.css'

function ProfileInfo({profile, isOwner, savePhotoProfile}){

    const uploadPhotoprofile = (e) => {
       if(e.target.files.length){
            savePhotoProfile(e.target.files[0])
       }
    }

    const chooseFile = (
        <input type="file" onChange={uploadPhotoprofile} />
    )

    return (
        <div className={s.profileWrapper}>
            <div className={s.profileCard}>
                <Card
                    image={profile.photos.large || 'https://image.flaticon.com/icons/png/512/186/premium/186313.png'}
                    header={profile.fullName}
                    meta={profile.lookingForAJob ? 'Working' : 'In serch work'}
                    description={profile.aboutMe || 'description'}
                    extra={isOwner ? chooseFile : null}
                />
            </div>
            <div className={s.profileStatus}>
                {/* <StatusContainerComponent /> */}
                <StatusContainerComponentWithHooks />
            </div>
        </div>
    )
}

export default ProfileInfo;