import {authThunkCreator} from './authReducer'

const INITIALIZE_SUCCESS = 'SET_INITIALIZED'
const IS_LOADING = 'IS_LOADING'

type ActionType = {
    type: typeof INITIALIZE_SUCCESS | typeof IS_LOADING,
    payload: boolean
}
export type InitialStateType = typeof initialState
type SetInitializeSuccessType = {
    type: typeof INITIALIZE_SUCCESS
}
type SetLoadingStatusType = {
    type: typeof IS_LOADING
    payload: boolean
}

const initialState = {
    initialized: false as boolean,
    isLoading: false as boolean,
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