import React from 'react';
import history from '../utils/history';

// import { userService }  from './user.service';
import Login from '../containers/Login/Login';
// import LoginPage from '../_components/DELETE_LoginPage';
const withAuth = (ContentComponent) => {
    
    // return element;
    /* return (props) => {
        return <ContentComponent {...props} />
    } */
    /* if(userService.loggedIn()){
        return (props) => {
            return <ContentComponent {...props} />
        }
    }
    else{
        return (props) => {
            history.push('/auth');
            return <LoginPage {...props} />
        }
    } */
    
}
export default withAuth;