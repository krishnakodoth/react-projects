import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li> User Menu </li>
        <NavigationItem link='/home' linkClick={props.onLinkSelect}>
            Home
        </NavigationItem>
        {/* <NavigationItem link='/users' linkClick={props.onLinkSelect}>
            User Master
        </NavigationItem>*/}
                
        <NavigationItem link='/player' linkClick={props.onLinkSelect}>
            Player
        </NavigationItem>
        
        <NavigationItem link='/match' linkClick={props.onLinkSelect}>
            Match
        </NavigationItem>
        <hr/>
        <li> My Account </li>
        <NavigationItem link='/change-pwd' linkClick={props.onLinkSelect}>
            Change Password
        </NavigationItem>
        
    </ul>
)
export default navigationItems;