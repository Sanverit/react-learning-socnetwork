import { userAPI } from '../api/api'
import { UserType, SetLoadingStatusType, IS_LOADING, ResultCodeEnum } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_FOLLOW_PROGRESS = 'SET_FOLLOW_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalCount: 20,
    currentPage: 1,
    isLoading: false,
    isFollowProgress: [] as Array<number>, //array of user ids
}
type InitialStateType = typeof initialState

type ActionsTypes =
    | FollowUserType
    | UnfollowUserType
    | SetUsersType
    | SetCurrPageType
    | SetTotalCountType
    | SetFollowProgressType
    | SetLoadingStatusType

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.payload) {
                        return {
                            ...u,
                            followed: true,
                        }
                    }
                    return u
                }),
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.payload) {
                        return {
                            ...u,
                            followed: false,
                        }
                    }
                    return u
                }),
            }

        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            }

        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload,
            }

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }

        case SET_FOLLOW_PROGRESS:
            return {
                ...state,
                isFollowProgress: action.payload.isLoading
                    ? [...state.isFollowProgress, action.payload.userId]
                    : state.isFollowProgress.filter((id) => id !== action.payload.userId),
            }

        default:
            return state
    }
}

type FollowUserType = {
    type: typeof FOLLOW
    payload: number
}
export const followUser = (userId: number): FollowUserType => ({ type: FOLLOW, payload: userId })

type UnfollowUserType = {
    type: typeof UNFOLLOW
    payload: number
}
export const unfollowUser = (userId: number): UnfollowUserType => ({ type: UNFOLLOW, payload: userId })

type SetUsersType = {
    type: typeof SET_USERS
    payload: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, payload: users })

type SetCurrPageType = {
    type: typeof SET_CURRENT_PAGE
    payload: number
}
export const setCurrPage = (pageNumber: number): SetCurrPageType => ({ type: SET_CURRENT_PAGE, payload: pageNumber })

type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    payload: number
}
export const setTotalCount = (totalCount: number): SetTotalCountType => ({ type: SET_TOTAL_COUNT, payload: totalCount })

export const setLoadingStatus = (status: boolean): SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

type SetFollowProgressType = {
    type: typeof SET_FOLLOW_PROGRESS
    payload: {
        isLoading: boolean
        userId: number
    }
}
export const setFollowProgress = (isLoading: boolean, userId: number): SetFollowProgressType => ({
    type: SET_FOLLOW_PROGRESS,
    payload: { isLoading, userId },
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))

        const data = await userAPI.getUsers(currentPage, pageSize)

        dispatch(setUsers(data.items))
        dispatch(setTotalCount(data.totalCount))
        dispatch(setLoadingStatus(false))
    }
}

export const followUnfollowUserThunkCreator = (userId: number, userFollowed: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(setFollowProgress(true, userId))

        if (userFollowed) {
            const resultCode = await userAPI.unfollowUser(userId)
            if (resultCode === ResultCodeEnum.Success) {
                dispatch(unfollowUser(userId))
            }
            dispatch(setFollowProgress(false, userId))
        } else {
            const resultCode = await userAPI.followUser(userId)
            if (resultCode === ResultCodeEnum.Success) {
                dispatch(followUser(userId))
            }
            dispatch(setFollowProgress(false, userId))
        }
    }
}

export default usersReducer
