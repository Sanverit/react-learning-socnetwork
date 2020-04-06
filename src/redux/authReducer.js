import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const DETETE_AUTH_USER_DATA = 'DETETE_AUTH_USER_DATA'
const IS_LOADING = 'IS_LOADING'

const initialState = {
    id: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    
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

export const setAuthUserData = (data) => ({ type: SET_AUTH_USER_DATA, payload: data })
export const deleteAuthUserData = (id, email, login, isAuth) => ({ type: DETETE_AUTH_USER_DATA, payload: {id, email, login, isAuth} })
export const setLoadingStatus = (status) => ({ type: IS_LOADING, payload: status })

export const authThunkCreator = () => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
         return authAPI.getAuth()
            .then((data)=> {
                if (data.resultCode === 0){
                    dispatch(setAuthUserData(data.data))
                }
                dispatch(setLoadingStatus(false))
            })
    }
}

export const loginThunkCreator = (email, password,rememberMe) => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        authAPI.login(email, password, rememberMe)
            .then((data)=> {
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
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        authAPI.logout()
            .then((data)=> {
                if (data.resultCode === 0){
                    dispatch(deleteAuthUserData(null, null, null, false))
                }
                dispatch(setLoadingStatus(false))
            })
    }
}

export default authReducer; 