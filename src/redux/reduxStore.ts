import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from './usersReducer'
import sideBarReducer from './sideBarReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
    form: formReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.store = store

export default store
