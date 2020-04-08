import { profileAPI } from '../api/api'
import { ThunkAction } from 'redux-thunk'

import { PhotosType, PostType, DataProfileType, SetLoadingStatusType, IS_LOADING, ResultCodeEnum } from '../types/types'
import { AppStateType } from './reduxStore'

const ADD_POST = 'ADD-POST'
const LIKE_POST = 'LIKE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_PROFILE_STATUS = 'SET_USER_PROFILE_STATUS'
const SET_USER_PROFILE_PHOTO = 'SET_USER_PROFILE_PHOTO'

type ActionsTypes =
    | SetProfileDataType
    | AddPostCreatorType
    | SetProfileStatusType
    | SetProfilePhotoType
    | LikePostCreatorType
    | SetLoadingStatusType

const initialState = {
    dataPosts: [
        {
            post: 'Post1',
            likesCount: 3,
            avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
            id: 1,
        },
        {
            post: 'Post2',
            likesCount: 2,
            avatar: 'https://image.flaticon.com/icons/png/512/186/premium/186313.png',
            id: 2,
        },
        {
            post: 'Post3',
            likesCount: 4,
            avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
            id: 3,
        },
    ] as Array<PostType>,
    dataProfile: null as DataProfileType | null,
    status: '' as string,
    isLoading: false as boolean,
    newPostText: '' as string,
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                post: action.payload,
                likesCount: 0,
                avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
                id: state.dataPosts.length + 1,
            }
            return {
                ...state,
                dataPosts: [...state.dataPosts, newPost],
                newPostText: '',
            }

        case LIKE_POST:
            return {
                ...state,
                dataPosts: state.dataPosts.map((p) => {
                    if (p.id === action.payload) {
                        return {
                            ...p,
                            likesCount: p.likesCount + 1,
                        }
                    }
                    return p
                }),
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                dataProfile: { ...action.payload },
            }

        case SET_USER_PROFILE_STATUS:
            return {
                ...state,
                status: action.payload,
            }

        case SET_USER_PROFILE_PHOTO:
            return {
                ...state,
                dataProfile: {
                    ...state.dataProfile,
                    photos: {
                        small: action.payload.small,
                        large: action.payload.large,
                    },
                } as DataProfileType,
            }

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }

        default:
            return state
    }
}

type SetProfileDataType = {
    type: typeof SET_USER_PROFILE
    payload: DataProfileType
}
export const setProfileData = (dataProfile: DataProfileType): SetProfileDataType => ({
    type: SET_USER_PROFILE,
    payload: dataProfile,
})

type AddPostCreatorType = {
    type: typeof ADD_POST
    payload: string
}
export const addPostCreator = (postMessage: string): AddPostCreatorType => ({ type: ADD_POST, payload: postMessage })

type SetProfileStatusType = {
    type: typeof SET_USER_PROFILE_STATUS
    payload: string
}
export const setProfileStatus = (status: string): SetProfileStatusType => ({
    type: SET_USER_PROFILE_STATUS,
    payload: status,
})

type SetProfilePhotoType = {
    type: typeof SET_USER_PROFILE_PHOTO
    payload: PhotosType
}
export const setProfilePhoto = (photos: PhotosType): SetProfilePhotoType => ({
    type: SET_USER_PROFILE_PHOTO,
    payload: photos,
})

type LikePostCreatorType = {
    type: typeof LIKE_POST
    payload: number
}
export const likePostCreator = (id: number): LikePostCreatorType => ({ type: LIKE_POST, payload: id })

export const setLoadingStatus = (status: boolean): SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const userProfileThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))

        const profileData = await profileAPI.getProfile(userId)
        dispatch(setProfileData(profileData))
        dispatch(setLoadingStatus(false))

        const profileStatus = await profileAPI.getProfileStatus(userId)
        dispatch(setProfileStatus(profileStatus))
        dispatch(setLoadingStatus(false))
    }
}

export const savePhotoProfileThunkCreator = (file: any): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))

        const data = await profileAPI.updateProfilePhoto(file)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setProfilePhoto(data.data.photos))
        }
        dispatch(setLoadingStatus(false))
    }
}

export const setNewStatusThunkCreator = (statusText: string): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))

        const resultCode = await profileAPI.setProfileStatus(statusText)
        if (resultCode === ResultCodeEnum.Success) {
            dispatch(setProfileStatus(statusText))
        }
        dispatch(setLoadingStatus(false))
    }
}

export default profileReducer
