import React from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux'

import Profile from './Profile'
import Preloader from '../Common/Preloader/Preloader'

import { userProfileThunkCreator, savePhotoProfileThunkCreator } from '../../redux/profileReducer'

class ProfileContainer extends React.Component {

    componentDidMount(){
        this.updateProfile()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.userId !== this.props.match.params.userId)
            this.updateProfile()
       
    }

    updateProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId
            if(!userId) this.props.history.push('/login')
        }
        this.props.userProfileThunkCreator(userId)
    }

    render(){
        const {profileData, isLoading, match, savePhotoProfileThunkCreator} = this.props;

        return (
            <>
                { 
                    !profileData || isLoading ? <Preloader /> : 
                    <Profile 
                        {...this.props} 
                        profile={profileData} 
                        isOwner={!match.params.userId} 
                        savePhotoProfile={savePhotoProfileThunkCreator}
                    />
                }
            </>
        )
   }
}

let mapStateToProps = (state) => {
    return {
        profileData: state.profilePage.dataProfile,
        isLoading: state.profilePage.isLoading,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
};

const ProfileContainerComponent = compose(
    connect( mapStateToProps, { userProfileThunkCreator, savePhotoProfileThunkCreator }),
    withRouter
)(ProfileContainer);

export default ProfileContainerComponent;