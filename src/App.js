import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { Container } from "semantic-ui-react";

import {initializeThunkCreator} from './redux/appReducer'
import HeaderContainer from './components/Header/HeaderContainer'
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login';
import Preloader from './components/Common/Preloader/Preloader';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.initializeThunkCreator();
  }

  render() {
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
      <Container>
        <HeaderContainer />
        <div className="appWrapper">
          <Navbar />
          <div className="appWrapperContent">
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
      initialized: state.app.initialized,
  }
};

export default connect(
  mapStateToProps,
  { initializeThunkCreator}
)(App);