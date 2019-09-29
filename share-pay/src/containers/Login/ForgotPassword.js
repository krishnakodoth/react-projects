import React, { Component } from 'react';
import Input from '../../components/Input';
import { validate } from '../../utils/form.validation';
import { userService } from '../../services/users.services';
import Firebase from '../../utils/Firebase';
class ForgotPassword extends Component {
    state = {
        loading: false,
        players: [],
        allowedUsers: [],
        isAlert: false,
        alertType: '',
        alertMessage: '',

        signUpForm: {
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Enter email'
                },
                label: 'Email',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }
    componentDidMount() {
        this.getPlayers();
    }

    getPlayers = () => {
        userService.getPlayers().then(players => {
            const playerEmails = [];
            players.forEach((row) => {
                playerEmails.push(row.email)
            })
            this.setState({ players: players, allowedUsers: playerEmails })
        }).catch(error => {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMessage: error.toString()
            });
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignupForm = {
            ...this.state.signUpForm
        };

        const updatedFormElement = {
            ...updatedSignupForm[inputIdentifier]
        };


        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = validate.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedSignupForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (inputIdentifier in updatedSignupForm) {
            formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signUpForm: updatedSignupForm, formIsValid: formIsValid });
    }
    handleResetPassowrdSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSignupSubmit
        this.setState({ loading: true });
        const formData = {};
        let formElementIdentifier;
        for (formElementIdentifier in this.state.signUpForm) {
            formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
        }
        // Check for allowed users
        const allowedUsers = [...this.state.allowedUsers];

        this.setState({ submitted: true,loading: true });
        Firebase.auth().sendPasswordResetEmail(formData.email)
        .then((response)=>{
            this.setState({
                 loading: false,
                 submitted: false,
                 isAlert: true,
                 alertType: 'success',
                 alertMessage: `Password reset link has been sent !`
             });
            // this.loginAgain();
        })
        .catch(error=>{
             // Handle Errors here.
             var errorCode = error.code;
             var errorMessage = error.message;
             this.setState({
                 loading: false,
                 isAlert: true,
                 alertType: 'danger',
                 alertMessage: `${errorCode} : ${errorMessage}`
             });
        })

        /* if (allowedUsers.includes(formData.email)) {
            Firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .catch(function (error) {
                    console.log(error)
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    this.setState({
                        loading: false,
                        isAlert: true,
                        alertType: 'danger',
                        alertMessage: `${errorCode} : ${errorMessage}`
                    });
                    // ...
                });

        }
        else {
            this.setState({
                loading: false,
                isAlert: true,
                alertType: 'danger',
                alertMessage: `${formData.email} is not in allowed list`
            });
        } */
    }

    render() {
        // console.log('[SignUp.js] allowedUsers',this.state.allowedUsers)
        const formElementsArray = [];
        let key;
        for (key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }

        let forgotForm = null;
        if (this.props.isFormActive) {
            forgotForm = (
                <section className="form-simple">
                    <div className="card">
                        <div className="header pt-3 grey lighten-2">
                            <div className="row d-flex justify-content-start">
                                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Reset Password</h3>
                            </div>
                        </div>
                        <form name="form" onSubmit={this.handleResetPassowrdSubmit}>
                            {
                                this.state.isAlert &&
                                <div className={`alert alert-${this.state.alertType}`}>{this.state.alertMessage}</div>
                            }
                            <div className="card-body mx-4 mt-4">
                                {
                                    formElementsArray.map(formElement => (

                                        <Input
                                            inputKey={formElement.id}
                                            key={formElement.id}
                                            type={formElement.config.type}
                                            label={formElement.config.label}
                                            config={formElement.config.config}
                                            value={formElement.config.value}
                                            invalid={!formElement.config.valid}
                                            shouldValidate={formElement.config.validation}
                                            touched={formElement.config.touched}
                                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                    ))
                                }


                                <div className="text-center mb-4">
                                    <button
                                        disabled={!this.state.formIsValid || this.state.loading}
                                        className={`btn btn-info btn-block z-depth-2 waves-effect waves-light btn-login ${this.state.isLoginLoad ? 'disabled' : ''}`}>
                                        Log in
                                        {
                                            this.state.loading &&
                                            <span>
                                                <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            </span>
                                        }
                                    </button>
                                </div>

                                <div className="text-center p-t-12">
                                    <span className="txt2 link" onClick={this.props.loginAgain}>
                                        Login Again
                                    </span>
                                </div>
                            </div>
                        </form>

                    </div>

                </section>
            );
        }
        return (
            forgotForm
        );
    }
}
export default ForgotPassword;