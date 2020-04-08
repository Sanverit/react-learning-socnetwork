import React from 'react'
import { connect } from 'react-redux';

import Header from './Header'
import Preloader from '../Common/Preloader/Preloader'
import { logoutThunkCreator } from '../../redux/authReducer'
import {AppStateType} from '../../redux/reduxStore'

type MapStatePropsType = {
    id: number | null
    email: string | null
    login: string | null
    isLoading: boolean
    isAuth: boolean
}

type MapDispatchPropsType = {
    logoutThunkCreator: () => void 
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {

    onLogout = () => {
        this.props.logoutThunkCreator()
    }

    render() {
        return (
            <>
                {this.props.isLoading && <Preloader />}
                <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.onLogout} />
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isLoading: state.auth.isLoading,
        isAuth: state.auth.isAuth
    }
};

export default connect(
    mapStateToProps,
    { logoutThunkCreator }
)(HeaderContainer);