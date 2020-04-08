import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'

import { SetLoadingStatusType, IS_LOADING, ResultCodeEnum } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const DETETE_AUTH_USER_DATA = 'DETETE_AUTH_USER_DATA'

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false,
}
type InitialStateType = typeof initialState
type ActionsTypes = SetAuthUserDataType | DeleteAuthUserDataType | SetLoadingStatusType

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }

        case DETETE_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
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

type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA
    payload: UserDataPayloadType
}
type UserDataPayloadType = {
    id: number
    email: string
    login: string
}
export const setAuthUserData = (data: UserDataPayloadType): SetAuthUserDataType => ({
    type: SET_AUTH_USER_DATA,
    payload: data,
})

type DeleteAuthUserDataType = {
    type: typeof DETETE_AUTH_USER_DATA
    payload: {
        id: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
export const deleteAuthUserData = (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
): DeleteAuthUserDataType => ({ type: DETETE_AUTH_USER_DATA, payload: { id, email, login, isAuth } })

export const setLoadingStatus = (status: boolean): SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const data = await authAPI.me()
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserData(data.data))
        }
        dispatch(setLoadingStatus(false))
    }
}

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(authThunkCreator())
        } else {
            const message = data.messages.length > 0 ? data.messages[0] : 'some message'
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            dispatch(stopSubmit('login', { _error: message }))
        }
        dispatch(setLoadingStatus(false))
    }
}

export const logoutThunkCreator = (): ThunkType => {
    return async (dispatch) => {
        dispatch(setLoadingStatus(true))
        const resultCode = await authAPI.logout()
        if (resultCode === ResultCodeEnum.Success) {
            dispatch(deleteAuthUserData(null, null, null, false))
        }
        dispatch(setLoadingStatus(false))
    }
}

export default authReducer
