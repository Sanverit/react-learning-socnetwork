import { authAPI } from '../api/api' 
import {authThunkCreator} from './authReducer'

const INITIALIZE_SUCCESS = 'SET_INITIALIZED'
const IS_LOADING = 'IS_LOADING'

const initialState = {
    initialized: false,
    isLoading: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialized: true
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

export const setInitializeSuccess = () => ({ type: INITIALIZE_SUCCESS })
export const setLoadingStatus = (status) => ({ type: IS_LOADING, payload: status })

export const initializeThunkCreator = () => {
    return (dispatch) => {
        dispatch(setLoadingStatus(true))
        let getAuthPromise = dispatch(authThunkCreator())
        getAuthPromise.then(()=>{
            dispatch(setInitializeSuccess())
            dispatch(setLoadingStatus(false))
        })
    }
}

export default appReducer; 