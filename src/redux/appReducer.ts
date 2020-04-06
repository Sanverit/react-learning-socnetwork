import {authThunkCreator} from './authReducer'

const INITIALIZE_SUCCESS = 'SET_INITIALIZED'
const IS_LOADING = 'IS_LOADING'

const initialState = {
    initialized: false as boolean,
    isLoading: false as boolean,
}

type InitialStateType = typeof initialState
type ActionType = {
    type: typeof INITIALIZE_SUCCESS | typeof IS_LOADING,
    payload: boolean
}

const appReducer = (state: InitialStateType = initialState, action:ActionType) => {
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
export const setLoadingStatus = (status: boolean) => ({ type: IS_LOADING, payload: status })

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