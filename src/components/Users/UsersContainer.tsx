import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import { setCurrPage, getUsersThunkCreator, followUnfollowUserThunkCreator } from '../../redux/usersReducer'
import {
    getUsers,
    getPageSize,
    getTotalCount,
    getCurrentPage,
    getIsLoading,
    getIsFollowProgress,
} from '../../redux/usersSelectors'

import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/reduxStore'

type MapStatePropsType = {
    users: Array<UserType>
    totalCount: number
    isLoading: boolean
    isFollowProgress: Array<number>
    currentPage: number
    pageSize: number
}
type MapDispatchPropsType = {
    setCurrPage: (activePage: number) => void
    getUsersThunkCreator: (page: number, pageSize: number) => void
    followUnfollowUserThunkCreator: (userId: number, userFollowed: boolean) => void
}
type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.getUsers(currentPage, pageSize)
    }

    getUsers(page: number, pageSize: number) {
        return this.props.getUsersThunkCreator(page, pageSize)
    }

    onFollowUnfollow = (userId: number, userFollowed: boolean) => {
        this.props.followUnfollowUserThunkCreator(userId, userFollowed)
    }

    onSetCurrPage = (_e: any, pageInfo: any) => {
        const { pageSize } = this.props
        this.props.setCurrPage(pageInfo.activePage)
        this.getUsers(pageInfo.activePage, pageSize)
    }

    render() {
        const { users, currentPage, totalCount, pageSize, isLoading, isFollowProgress } = this.props
        return (
            <>
                <h3>{this.props.pageTitle}</h3>
                {isLoading && <Preloader />}
                <Users
                    users={users}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    followUnfollow={this.onFollowUnfollow}
                    setCurrentPage={this.onSetCurrPage}
                    isFollowProgress={isFollowProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        isFollowProgress: getIsFollowProgress(state),
    }
}

const AuthRedirectComponent = compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setCurrPage,
        getUsersThunkCreator,
        followUnfollowUserThunkCreator,
    }),
)(UsersContainer)

export default AuthRedirectComponent
