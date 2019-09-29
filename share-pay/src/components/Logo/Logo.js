import React,{Fragment} from 'react';
import classes from './Logo.module.css';
import spLogo from '../../assets/images/sp-logo.png';

const logo = (props) =>(
    <div className={classes.Logo}>
        <img alt="logo" src={spLogo}/>
    </div>
)
export default logo;