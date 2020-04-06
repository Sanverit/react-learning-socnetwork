import { userAPI } from '../api/api'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const IS_LOADING = 'IS_LOADING'
const SET_FOLLOW_PROGRESS = 'SET_FOLLOW_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number,
    totalCount:20 as number,
    currentPage: 1 as number,
    isLoading: false as boolean,
    isFollowProgress: [] as Array<Number>
}
type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string | null,
    photos: {
        small: string | null,
        large: string | null
    }
    status: string | null,
    followed: boolean
}
type InitialStateType = typeof initialState
type ActionType = {
    type: typeof FOLLOW | typeof UNFOLLOW | typeof SET_USERS | typeof SET_CURRENT_PAGE | typeof SET_TOTAL_COUNT | typeof IS_LOADING | typeof SET_FOLLOW_PROGRESS 
    payload: any
}

const usersReducer = (state:InitialStateType = initialState, action:ActionType) => {
    
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

export const followUser = (userId: number) => ({ type: FOLLOW, payload: userId })
export const unfollowUser = (userId: number) => ({ type: UNFOLLOW, payload: userId })
export const setUsers = (users: UserType) => ({ type: SET_USERS, payload: users })
export const setCurrPage = (pageNumber: number) => ({ type: SET_CURRENT_PAGE, payload: pageNumber })
export const setTotalCount = (totalCount: number) => ({ type: SET_TOTAL_COUNT, payload: totalCount })
export const setLoadingStatus = (status: boolean) => ({ type: IS_LOADING, payload: status })
export const setFollowProgress = (isLoading: boolean, userId:number) => ({ type: SET_FOLLOW_PROGRESS, payload: {isLoading, userId} })


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: Function) => {
        dispatch(setLoadingStatus(true));
        userAPI.getUsers(currentPage, pageSize)
            .then((data: any)=> {
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount));
                dispatch(setLoadingStatus(false));
            })
    }
} 

export const followUnfollowUserThunkCreator = (userId: number, userFollowed: boolean) => {
    return (dispatch: Function) => {
        dispatch(setFollowProgress(true, userId));
        if(userFollowed){
            userAPI.unfollowUser(userId)
                .then((resultCode: number)=> {
                    if (resultCode === 0){
                        dispatch(unfollowUser(userId));
                    }
                    dispatch(setFollowProgress(false, userId));
                });

        }else{
            userAPI.followUser(userId)
                .then((resultCode: number)=> {
                    if (resultCode === 0){
                        dispatch(followUser(userId));
                    }
                    dispatch(setFollowProgress(false, userId));
                });
        }
    }
} 

export default usersReducer;