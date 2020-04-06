import { profileAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const LIKE_POST = 'LIKE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_PROFILE_STATUS = 'SET_USER_PROFILE_STATUS'
const SET_USER_PROFILE_PHOTO = 'SET_USER_PROFILE_PHOTO'
const IS_LOADING = 'IS_LOADING'

const initialState = {
    dataPosts: [
        {
            post: "Post1",
            likesCount: 3,
            avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
            id: 1
        },
        {
            post: "Post2",
            likesCount: 2,
            avatar: "https://image.flaticon.com/icons/png/512/186/premium/186313.png",
            id: 2
        },
        {
            post: "Post3",
            likesCount: 4,
            avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
            id: 3
        },
    ],
    dataProfile: null,
    status: '',
    isLoading: false
}

const profileReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                post: action.payload,
                likesCount: 0,
                avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
                id: state.dataPosts.length+1
            };
            return {
                ...state,
                dataPosts: [...state.dataPosts, newPost],
                newPostText: ''
            };

        case LIKE_POST: 
            return {
                ...state,
                dataPosts: state.dataPosts.map((p) => {
                    if(p.id === action.payload){
                        return {
                            ...p,
                            likesCount: p.likesCount+1
                        }
                    }
                    return p
                })
            };
        
        case SET_USER_PROFILE:
            return {
                ...state,
                dataProfile: { ...action.payload}
            }

        case SET_USER_PROFILE_STATUS:
            return {
                ...state,
                status: action.payload
            }

        case SET_USER_PROFILE_PHOTO:
            return {
                ...state,
                dataProfile: {
                    ...state.dataProfile,
                    photos: {
                        ...state.dataProfile.photos,
                        small: action.payload.small,
                        large: action.payload.large
                    }
                }
            }

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }
    
}

export const setProfileData = (dataProfile) => ({ type: SET_USER_PROFILE, payload: dataProfile })

export const addPostCreator = (postMessage) => ({ type: ADD_POST, payload: postMessage })

export const setProfileStatus = (status) => ({ type: SET_USER_PROFILE_STATUS, payload: status })
export const setProfilePhoto = (photos) => ({ type: SET_USER_PROFILE_PHOTO, payload: photos })

export const likePostCreator = (id) => ({ type: LIKE_POST, payload: id })
export const setLoadingStatus = (status) => ({ type: IS_LOADING, payload: status })


export const userProfileThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))

        profileAPI.getProfile(userId)
            .then((data)=> {
                dispatch(setProfileData(data))
                dispatch(setLoadingStatus(false))
            })

        profileAPI.getProfileStatus(userId)
            .then((data)=> {
                dispatch(setProfileStatus(data))
                dispatch(setLoadingStatus(false))
            })
    } 
}

export const savePhotoProfileThunkCreator = (file) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))

        profileAPI.updateProfilePhoto(file)
            .then((data)=> {
                if (data.resultCode === 0){
                    dispatch(setProfilePhoto(data.data.photos))
                }
                dispatch(setLoadingStatus(false))
            })
    } 
}

export const setNewStatusThunkCreator = (statusText) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        profileAPI.setProfileStatus(statusText)
            .then((resultCode)=> {
                if (resultCode === 0){
                    dispatch(setProfileStatus(statusText));
                }
                dispatch(setLoadingStatus(false))
            })
    } 
}

export default profileReducer;