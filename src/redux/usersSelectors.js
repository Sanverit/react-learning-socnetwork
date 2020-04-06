import { createSelector } from 'reselect'

const getUsersPrimitive = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersPrimitive, (users)=>{
    return users.filter(user => true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalCount = (state) => {
    return state.usersPage.totalCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}

export const getIsFollowProgress = (state) => {
    return state.usersPage.isFollowProgress
}

