import React, { Component } from 'react';
import Firebase from '../../utils/Firebase';
import { userService } from '../../services/users.services';
import './Login.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';


class Login extends Component {
    constructor(props) {
        super(props);
        // userService.logout();
        this.state = {
            loginEmail: '',
            loginPassword: '',
            forgotPwdEmail:'',
            submitted: false,
            loading: false,
            error: '',
            isLogin:true,
            isForgotPwd:false,
            isSignUp:false,
            isSignupSubmitted:false
        };
        //this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) =>{
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    forgortPassword = () => {
        this.setState({
            isLogin:false,
            isForgotPwd:true,
            isSignUp:false,
            submitted:false
        });
    }
    loginAgain = () =>{
        this.setState({
            isLogin:true,
            isForgotPwd:false,
            isSignUp:false,
            submitted:false
        });
    }
    signUpNow = () =>{
        this.setState({
            isLogin:false,
            isForgotPwd:false,
            isSignUp:true,
            submitted:false
        });
    }

    handleSignupSubmit = () =>{
        console.log('handleSignupSubmit')
    }



    render() {
        const { username, password, submitted, loading, error } = this.state;
        
        return (
            <React.Fragment>
                <div className="text-center">
                    <div className="row mt-5 text-left">
                        <div className="col-lg-5 col-md-6 m-auto mb-4">
                            {
                                this.state.isLogin &&
                                <SignIn 
                                    isFormActive={this.state.isLogin}
                                    isSubmitted={this.state.isSignupSubmitted}
                                    forgortPassword={this.forgortPassword}
                                    signUpNow={this.signUpNow} />
                            }                        
                            {
                                this.state.isForgotPwd &&
                                <ForgotPassword 
                                    isFormActive={this.state.isForgotPwd}
                                    handleSubmit={this.handleForgotPwdSubmit}
                                    isSubmitted={this.state.isSignupSubmitted}
                                    forgortPassword={this.forgortPassword}
                                    loginAgain={this.loginAgain} />
                            }
                            
                            {
                                this.state.isSignUp &&
                                <SignUp 
                                    isFormActive={this.state.isSignUp}
                                    handleSignupSubmit={this.handleSignupSubmit}
                                    isSubmitted={this.state.isSignupSubmitted} 
                                    loginAgain={this.loginAgain} />
                            }
                            

                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Login;