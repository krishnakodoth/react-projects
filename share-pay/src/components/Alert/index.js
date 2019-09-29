import React from 'react';
const Alert = ({ alertType,alertMessage }) => {
    return(
        <div className={`alert alert-${alertType}`} role="alert">
        { alertMessage }
        </div>
    )
}
export default Alert;