import {authThunkCreator} from './authReducer'
import {SetLoadingStatusType, IS_LOADING} from '../types/types'

const INITIALIZE_SUCCESS = 'SET_INITIALIZED'

type ActionType = {
    type: typeof INITIALIZE_SUCCESS | typeof IS_LOADING,
    payload: boolean
}
type InitialStateType = typeof initialState
type SetInitializeSuccessType = {
    type: typeof INITIALIZE_SUCCESS
}

const initialState = {
    initialized: false,
    isLoading: false,
}

const appReducer = (state = initialState, action:ActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true,
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

export const setInitializeSuccess = ():SetInitializeSuccessType => ({ type: INITIALIZE_SUCCESS })
export const setLoadingStatus = (status: boolean):SetLoadingStatusType => ({ type: IS_LOADING, payload: status })

export const initializeThunkCreator = () => {
    return (dispatch: Function) => {
        dispatch(setLoadingStatus(true))
        let getAuthPromise = dispatch(authThunkCreator())
        getAuthPromise.then(()=>{
            dispatch(setInitializeSuccess())
            dispatch(setLoadingStatus(false))
        })
    }
}

export default appReducer; 