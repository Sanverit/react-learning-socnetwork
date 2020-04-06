import { userAPI } from '../api/api'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const IS_LOADING = 'IS_LOADING'
const SET_FOLLOW_PROGRESS = 'SET_FOLLOW_PROGRESS'

const initialState = {
    users: [],
    pageSize: 5,
    totalCount:20,
    currentPage: 1,
    isLoading: false,
    isFollowProgress: []
}

const usersReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.payload){
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.payload){
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload
            }

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        case SET_FOLLOW_PROGRESS:
            return {
                ...state,
                isFollowProgress: action.payload.isLoading ? [...state.isFollowProgress, action.payload.userId] : state.isFollowProgress.filter(id => id !== action.payload.userId )
            }

        default:
            return state;
    }
    
}

export const followUser = (userId) => ({ type: FOLLOW, payload: userId })
export const unfollowUser = (userId) => ({ type: UNFOLLOW, payload: userId })
export const setUsers = (users) => ({ type: SET_USERS, payload: users })
export const setCurrPage = (pageNumber) => ({ type: SET_CURRENT_PAGE, payload: pageNumber })
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, payload: totalCount })
export const setLoadingStatus = (status) => ({ type: IS_LOADING, payload: status })
export const setFollowProgress = (isLoading, userId) => ({ type: SET_FOLLOW_PROGRESS, payload: {isLoading, userId} })


export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true));
        userAPI.getUsers(currentPage, pageSize)
            .then((data)=> {
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount));
                dispatch(setLoadingStatus(false));
            })
    }
} 

export const followUnfollowUserThunkCreator = (userId, userFollowed) => {
    return (dispatch) => {
        dispatch(setFollowProgress(true, userId));
        if(userFollowed){
            userAPI.unfollowUser(userId)
                .then((resultCode)=> {
                    if (resultCode === 0){
                        dispatch(unfollowUser(userId));
                    }
                    dispatch(setFollowProgress(false, userId));
                });

        }else{
            userAPI.followUser(userId)
                .then((resultCode)=> {
                    if (resultCode === 0){
                        dispatch(followUser(userId));
                    }
                    dispatch(setFollowProgress(false, userId));
                });
        }
    }
} 

export default usersReducer;