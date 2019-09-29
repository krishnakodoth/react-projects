import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

import { userService } from '../../../services/users.services';

const sideDrawer = (props) => {
    const currentUser = props.currentUser;// userService.getUserProfile();
    let attachedClasess = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasess = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.open} onDismiss={props.onDismiss} />
            <div className={attachedClasess.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <div className={[classes.gb_6a,classes.NavBox].join(' ')}>
                    <div className={classes.gb_8a}>
                        <div className={[classes.gb_jb,classes.gb_kb].join(' ')}>
                        {
                            currentUser &&
                            currentUser.email
                        }
                        </div>
                        <div className={classes.gb_lb}>
                            
                        </div>
                        <div className={[classes.gb_bg,classes.gb_5a].join(' ')}>
                        {/*<button 
                            type="button" 
                            className="btn btn-outline-primary btn-rounded waves-effect"
                            onClick={props.changePwdClick}
                            title="Change Password">
                            <i className="fa fa-key"/>
                        </button>*/}

                            <button 
                                type="button" 
                                className="btn btn-outline-danger btn-rounded waves-effect"
                                onClick={props.logoutClick}
                                title="SignOut">
                                <i className="fa fa-sign-out-alt"/>
                                &nbsp; Logout
                            </button>
                            
                        </div>
                    </div>
                </div>
                <nav className={classes.NavBox}>
                    <NavigationItems onLinkSelect={props.onDismiss} />
                </nav>
                
            </div>
        </Fragment>

    );
}
export default sideDrawer;