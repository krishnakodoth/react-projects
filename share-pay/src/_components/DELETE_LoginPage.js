import React, { Component } from 'react';

import { userService } from '../_services/user.service';
import NavBar from './NavBar';
import Footer from './Footer';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;
        console.log("==>",returnUrl)
        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                data => {
                    if(data){
                        const { from } = (this.props.location.state) ? this.props.location.state : { from: { pathname: "/" } };
                        this.setState({ loading: false })
                        this.props.history.push(from);
                    }                    
                },
                error => {
                    this.setState({ error:error.toString(), loading: false })
                }
            );
    }



    

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <React.Fragment>
                <NavBar />
                <div className="text-center">
                    <div className="row mt-5 text-left">
                        <div className="col-lg-5 col-md-6 m-auto mb-4">
                            <section className="form-simple">
                                <div className="card">
                                    <div className="header pt-3 grey lighten-2">

                                        <div className="row d-flex justify-content-start">
                                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
                                        </div>

                                    </div>
                                    <form name="form" onSubmit={this.handleSubmit}>
                                    
                                    {error &&
                                        <div className={'alert alert-danger'}>{error}</div>
                                    }

                                        <div className="card-body mx-4 mt-4">
                                            <div className={'md-form form-group' + (submitted && !username ? ' has-error' : '')}>
                                                <input
                                                    type="text"
                                                    id="Form-email4"
                                                    name="username"
                                                    className={`form-control ${this.state.isLoginLoad ? 'disabled' : ''}`}
                                                    placeholder="Your username"
                                                    onChange={this.handleChange}
                                                    value={this.state.username}
                                                />
                                                {submitted && !username &&
                                                    <div className="help-block">Username is required</div>
                                                }

                                            </div>

                                            <div className={'md-form pb-3 form-group' + (submitted && !password ? ' has-error' : '')}>
                                                <input
                                                    type="password"
                                                    id="Form-pass4"
                                                    className={`form-control`}
                                                    name="password"
                                                    placeholder="Your password"
                                                    onChange={this.handleChange}
                                                    value={this.state.password}
                                                />
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }

                                            </div>

                                            <div className="text-center mb-4">
                                                <button
                                                    disabled={loading}
                                                    className={`btn btn-danger btn-block z-depth-2 waves-effect waves-light btn-login ${this.state.isLoginLoad ? 'disabled' : ''}`}>
                                                    Log in
                                                    {
                                                        loading &&
                                                        <span>
                                                            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        </span>
                                                    }
                                                </button>
                                            </div>

                                        </div>
                                    </form>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default LoginPage;