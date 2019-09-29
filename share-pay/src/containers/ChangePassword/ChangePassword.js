import React, { Component, Fragment } from 'react';
import Alert from '../../components/Alert';
import Firebase from '../../utils/Firebase';

class ChangePassword extends Component {
    state ={
        isLoading : false,
        isAlert: false,
        alertType: 'success',
        alertMessage: 'Test'
    }
    sendPasswordResetMail = () =>{
        this.setState({
            isLoading : true,
        });
        const cUser = Firebase.auth().currentUser;
        Firebase.auth().sendPasswordResetEmail(cUser.email).then(()=>{
            // Email sent.
            this.setState({
                isLoading : false,
                isAlert: true,
                alertType: 'success',
                alertMessage: 'Reset password link has been sent to your registered email'
            });

        }).catch(function(error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({
                isLoading : false,
                isAlert: true,
                alertType: 'danger',
                alertMessage: `${errorCode} : ${errorMessage}`
            });
        });
    }
    render() {
        return (
            <Fragment>
                <div className="dt-title mb-10">Change Password</div>
                <br/>
                {
                    this.state.isAlert &&
                    <Alert alertType={this.state.alertType} alertMessage={this.state.alertMessage} />
                }
                <hr />
                <div className="alert alert-primary" role="alert">
                    <h4 className="alert-heading">Note !</h4>
                    <p>You can send a password reset email to a your registered email. Please check your email form reset your password.</p>
                    <hr />
                    <p className="mb-0 text-center">
                        <button 
                            className="btn btn-info btn-rounded waves-effect waves-light"
                            onClick={this.sendPasswordResetMail}
                            disabled={this.state.isLoading}>
                            <i className="fa fa-key"/> 
                            &nbsp;
                            Send Reset Password Email
                        </button>                    
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default ChangePassword;