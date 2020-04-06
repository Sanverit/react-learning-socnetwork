import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from './usersReducer'
import sideBarReducer from './sideBarReducer'
import authReducer from './authReducer'
import appReducer from "./appReducer";

let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    usersPage: usersReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;