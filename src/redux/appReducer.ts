import { authThunkCreator } from './authReducer'
import { SetLoadingStatusType, IS_LOADING } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'

const INITIALIZE_SUCCESS = 'SET_INITIALIZED'

type ActionType = {
    type: typeof INITIALIZE_SUCCESS | typeof IS_LOADING
    payload: boolean
}

type SetInitializeSuccessType = {
    type: typeof INITIALIZE_SUCCESS
}

type ActionsTypes = ActionType | SetInitializeSuccessType

const initialState = {
    initialized: false,
    isLoading: false,
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
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

export const setInitializeSuccess = (): SetInitializeSuccessType => ({ type: INITIALIZE_SUCCESS })
export const setLoadingStatus = (status: boolean): SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeThunkCreator = (): ThunkType => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        const getAuthPromise = dispatch(authThunkCreator())
        getAuthPromise.then(() => {
            dispatch(setInitializeSuccess())
            dispatch(setLoadingStatus(false))
        })
    }
}

export default appReducer
