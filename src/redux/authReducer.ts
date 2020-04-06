import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

import { SetLoadingStatusType, IS_LOADING } from '../types/types'
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const DETETE_AUTH_USER_DATA = 'DETETE_AUTH_USER_DATA'

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false
}
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action:any): InitialStateType  => {
    
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            };
            
        case DETETE_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };

        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }
    
}

type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA, 
    payload: UserDataPayloadType
}
type UserDataPayloadType = {
    id: number,
    email: string,
    login: string,
    isAuth: boolean,
}
export const setAuthUserData = (data: UserDataPayloadType):SetAuthUserDataType => ({ type: SET_AUTH_USER_DATA, payload: data })

type DeleteAuthUserDataType = {
    type: typeof DETETE_AUTH_USER_DATA, 
    payload: any
}
export const deleteAuthUserData = (id:number|null, email:string|null, login:string|null, isAuth:boolean):DeleteAuthUserDataType => ({ type: DETETE_AUTH_USER_DATA, payload: {id, email, login, isAuth} })

export const setLoadingStatus = (status: boolean):SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

export const authThunkCreator = () => {
    return (dispatch:any) => {
        dispatch(setLoadingStatus(true))
         return authAPI.getAuth()
            .then((data:any)=> {
                if (data.resultCode === 0){
                    dispatch(setAuthUserData(data.data))
                }
                dispatch(setLoadingStatus(false))
            })
    }
}

export const loginThunkCreator = (email:string, password:string, rememberMe:boolean) => {
    return (dispatch:any) => {
        dispatch(setLoadingStatus(true))
        authAPI.login(email, password, rememberMe)
            .then((data:any)=> {
                if (data.resultCode === 0){
                    dispatch(authThunkCreator())
                } else {
                    let action = stopSubmit("login", {_error: data.messages[0]});
                    dispatch(action);
                }
                dispatch(setLoadingStatus(false))
            })
    }
}

export const logoutThunkCreator = () => {
    return (dispatch:any) => {
        dispatch(setLoadingStatus(true))
        authAPI.logout()
            .then((data:any)=> {
                if (data.resultCode === 0){
                    dispatch(deleteAuthUserData(null, null, null, false))
                }
                dispatch(setLoadingStatus(false))
            })
    }
}

export default authReducer; 