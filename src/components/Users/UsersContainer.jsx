import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';

import Users from './Users'
import Preloader from '../Common/Preloader/Preloader'
import { 
    setCurrPage,
    getUsersThunkCreator,
    followUnfollowUserThunkCreator } from '../../redux/usersReducer'
import {
    getUsers,
    getPageSize,
    getTotalCount,
    getCurrentPage,
    getIsLoading,
    getIsFollowProgress
} from '../../redux/usersSelectors'

class UsersContainer extends React.Component {

    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.getUsers(currentPage, pageSize)
    }

    getUsers(page, pageSize){
        return this.props.getUsersThunkCreator(page, pageSize)
    }

    onFollowUnfollow = (userId, userFollowed) => {
        this.props.followUnfollowUserThunkCreator(userId, userFollowed);
    }

    onSetCurrPage = (e, pageInfo) => {
        const { pageSize } = this.props;
        this.props.setCurrPage(pageInfo.activePage);
        this.getUsers(pageInfo.activePage, pageSize)
    }

    render(){
        const {users, currentPage, totalCount, pageSize, isLoading, isFollowProgress} = this.props;
        return (
            <>
                { isLoading && <Preloader /> }
                <Users
                    users={users} 
                    pageSize={pageSize}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    followUnfollow={this.onFollowUnfollow}
                    setCurrPage={this.onSetCurrPage}
                    isFollowProgress={isFollowProgress}
                />
            </>
        )
   }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalCount: state.usersPage.totalCount,
//         currentPage: state.usersPage.currentPage,
//         isLoading: state.usersPage.isLoading,
//         isFollowProgress: state.usersPage.isFollowProgress
//     }
// };

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        isFollowProgress: getIsFollowProgress(state)
    }
};

const AuthRedirectComponent = compose(
    connect( mapStateToProps, { setCurrPage, getUsersThunkCreator, followUnfollowUserThunkCreator }),
)(UsersContainer)

export default AuthRedirectComponent