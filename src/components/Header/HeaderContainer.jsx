import React from 'react'
import { connect } from 'react-redux';

import Header from './Header'
import Preloader from '../Common/Preloader/Preloader'
import { logoutThunkCreator } from '../../redux/authReducer'

class HeaderContainer extends React.Component {

    onLogout = () => {
        this.props.logoutThunkCreator()
    }

    render() {
        const { isLoading } = this.props;

        return (
            <>
                {isLoading && <Preloader />}
                <Header {...this.props} logout={this.onLogout} />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
};

export default connect(
    mapStateToProps,
    { logoutThunkCreator }
)(HeaderContainer);