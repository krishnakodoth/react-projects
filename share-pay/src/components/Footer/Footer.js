import React from 'react';
import classes from './Footer.module.css';
const footer = () => (
    <footer className={classes.Footer}>
    <p> sharePay &copy; {new Date().getFullYear()}</p>
    </footer>    
);
export default footer;
