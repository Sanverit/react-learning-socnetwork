import { createSelector } from 'reselect'
import { AppStateType } from './reduxStore'
const getUsersPrimitive = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersPrimitive, (users) => {
    return users.filter((user) => user)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state: AppStateType) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading
}

export const getIsFollowProgress = (state: any) => {
    return state.usersPage.isFollowProgress
}
