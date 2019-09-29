
/**
 * @file App React Component wrapper for the application. 
 *
 *
 * @extends Component
 */

import React, { Component,Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Firebase from '../../utils/Firebase';

import './App.module.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/mdb.min.css';
import '../../assets/css/style.css';


// import Header from './Header'
// import Counter from './Counter'/ 

// import withAuth from '../../_services/WithAuth';


// import { PrivateRoute } from '../../_components/PrivateRoute';

// import LoginPage from '../../_components/DELETE_LoginPage';


import Layout from '../Layout/Layout';

import Spinner from '../../components/UI/Spinner/Spinner';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

import withAuth from '../../hoc/withAuth';


class App extends Component {
  state = {
    authHandled:false
  };
  componentDidMount() {
    // this.authListener();
  }
  authListener = () => {
    this.setState({
      authHandled:true
    });
    Firebase.auth().onAuthStateChanged((user) => {
     if (user) {
        this.props.onLoadCurrentUser(user); 
        // history.replace('/home');
      }
      else{
        this.props.onLoadCurrentUser(null);
        // history.replace('/login');
      }
    })
  }

  onDismiss = () =>{}

  render() {
    let pageElement = (
      <Fragment>
        <Backdrop show onDismiss={this.onDismiss} />
        <Spinner />
      </Fragment>
    );
    /* if(this.state.authHandled && this.props.currentUser){
      return <Redirect to='/home' />      
    }
    if(this.state.authHandled && !this.props.currentUser){
    pageElement = <Login />;
    } */
    
    return (
      <div className="container">
        <Helmet
          titleTemplate="%s - sharePay"
          defaultTitle="sharePay"
        >
          <meta name="description" content="Shuttle players expense management" />
        </Helmet>
        {//pageElement
        }
        <Layout />        
      </div>
    )
  }
}
export default withAuth(App);


// export default connect(mapStateToProps,mapDispatchToProps)(App);