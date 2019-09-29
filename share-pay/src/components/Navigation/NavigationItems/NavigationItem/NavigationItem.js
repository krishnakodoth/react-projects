import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './NavigationItem.module.css';

const navigationItem = (props) =>(
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            activeClassName={classes.active}
            onClick={props.linkClick}> 
            <i 
                className="fa fa-hand-point-right"
                style={{ padding: '0 10px'}} />
            {props.children}
        </NavLink>
    </li>
);
export default navigationItem;