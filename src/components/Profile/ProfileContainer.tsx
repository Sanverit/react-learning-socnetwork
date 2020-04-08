import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { DataProfileType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'
import Profile from './Profile'
import Preloader from '../Common/Preloader/Preloader'

import { userProfileThunkCreator, savePhotoProfileThunkCreator } from '../../redux/profileReducer'

type MapStatePropsType = {
    profileData: DataProfileType | null
    isLoading: boolean
    authorisedUserId: number | null
    isAuth: boolean
}

type HystoryPropsType = RouteComponentProps

type UserIdDetailParams = {
    userId: string
}

type UserIdDetailProps = RouteComponentProps<UserIdDetailParams>

type MapDispatchPropsType = {
    userProfileThunkCreator: (userId: number) => void
    savePhotoProfileThunkCreator: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & HystoryPropsType & UserIdDetailProps

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) this.updateProfile()
    }

    updateProfile() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            if (this.props.authorisedUserId) userId = this.props.authorisedUserId
            if (!userId) this.props.history.push('/login')
        }
        this.props.userProfileThunkCreator(userId)
    }

    render() {
        const { profileData, isLoading, match, savePhotoProfileThunkCreator } = this.props

        return (
            <>
                {!profileData || isLoading ? (
                    <Preloader />
                ) : (
                    <Profile
                        {...this.props}
                        profile={profileData}
                        isOwner={!match.params.userId}
                        savePhotoProfile={savePhotoProfileThunkCreator}
                    />
                )}
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profileData: state.profilePage.dataProfile,
        isLoading: state.profilePage.isLoading,
        authorisedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

const ProfileContainerComponent = compose(
    connect(mapStateToProps, { userProfileThunkCreator, savePhotoProfileThunkCreator }),
    withRouter,
)(ProfileContainer)

export default ProfileContainerComponent
