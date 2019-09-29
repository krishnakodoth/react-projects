import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { userService } from '../../services/users.services';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';

import Home from '../../components/Home/Home';
import Page404 from '../../components/Page404/Page404';
import Player from '../Player/Player';
import Match from '../Match/Match';
import Alert from '../../components/Alert';
import ChangePassword from '../ChangePassword/ChangePassword';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from '../../store/selectors';
import { logoutUser } from '../App/actions';

class Layout extends Component {
  state = {
    showSideDrawer: false,
    uid:'',
    isAlert:false,
    alertType:'',
    alertMessage:'',
  }
  componentDidMount(){
    // this.getUserProfile();
  }
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  toggleDrawer = () => {

    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  logoutHandler = () =>{
    userService.logout();
    this.props.onLogoutUser();
  }
  
  changePwdHandler = () =>{
    this.setState({
      isAlert:true,
      alertType:'success',
      alertMessage:'Password reset mail has been sent !',
    });
    this.sideDrawerCloseHandler()
  }
  

  render() {
    // console.log('currentUser',this.props.currentUser)
    return (
      <Fragment>
        <Toolbar toggleDrawer={this.toggleDrawer} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          onDismiss={this.sideDrawerCloseHandler}
          logoutClick={this.logoutHandler} 
          changePwdClick={this.changePwdHandler} 
          currentUser={this.props.currentUser} />
        <div className={["app-wrap", classes.Main].join(' ')}>
        
          {
            this.state.isAlert &&
            <Alert alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
          }
          <Switch>
            <Route exact path='/' render={() => (<Redirect to="/home" />)} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/player" component={Player} />
            <Route exact path="/match" component={Match} />
            <Route exact path="/change-pwd" component={ChangePassword} />
            <Route exact path='*' component={Page404} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});
const mapDispatchToProps = (dispatch) => ({
  onLogoutUser: () => dispatch(logoutUser()),
  /* onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  } */
});

export default connect(mapStateToProps,mapDispatchToProps)(Layout);;