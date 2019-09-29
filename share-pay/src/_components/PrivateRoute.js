import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from '../_services/user.service';

export const PrivateRoute = ({ component: Component, ...rest }) =>{
    return (
        <Route {...rest} render={props => (
            userService.loggedIn()
                ? <Redirect to='/home' />
                /* <Component {...props} /> */
                : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )} />
    )
}