import React,{ Component } from 'react';
import {connect} from 'react-redux';  

import Login from '../containers/Login/Login';

export function withAuth(Component) {
  class AuthenticatedComponent extends Component {
    render() {
      return (
        <div>
          {
            localStorage.getItem('app_sp_token') // this.props.isAuthenticated === true && 
            ? <Component {...this.props}/>
            : <Login />
          }
        </div>
      )
    }
  }
  const mapStateToProps = (state) =>({
    isAuthenticated: state.global.isAuthenticated
  });
  return connect(mapStateToProps)(AuthenticatedComponent)
}
export default withAuth;