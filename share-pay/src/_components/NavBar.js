import React, { Component } from 'react';

import Logo from '../assets/img/logo.png';
import { Redirect, NavLink } from "react-router-dom";

import { userService } from '../_services/user.service';

// import AuthService from '../services/AuthService';
// const Auth = new AuthService();
class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: false,
            isLogout: false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
    }
    /**
   * Set the wrapper ref
   */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    toggleProfile = (e) => {
        e.preventDefault()
        this.setState({
            isToggled: !this.state.isToggled
        })
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isToggled) {
            this.setState({
                isToggled: !this.state.isToggled
            })
        }
    }
    handleLogout = () => {
        userService.logout();
        this.setState({
            isLogout: true
        })
    }

    render() {
        let userProfile = userService.getUserProfile();
        if (this.state.isLogout) {
            return <Redirect to='/auth' />
        }
        return (
            <section id="navbars" className="text-center">
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark blue-gradient">
                    <a className="navbar-brand" href="/#">
                        <img alt="Logo" src={Logo} />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {
                        /*
                        <div class="navbar-collapse collapse show " id="basicExampleNav">
                            <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link waves-effect waves-light" href="#">Home
                                  <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link waves-effect waves-light" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link waves-effect waves-light" href="#">Pricing</a>
                            </li>
                        </ul>
                        </div>
                            */
                    }

                    <div className="collapse navbar-collapse show" id="navbarSupportedContent-3">
                        {
                            userService.loggedIn() &&
                            (<ul className="navbar-nav mr-auto">
                                <NavLink
                                    className="nav-item btn btn-mdb-color waves-effect sp-nav-btn"
                                    activeClassName="btn-light-green"
                                    to="/home">
                                    <span className="nav-link waves-effect waves-light" href="#">Home</span>
                                </NavLink>
                                <NavLink
                                    className="nav-item btn btn-mdb-color waves-effect sp-nav-btn"
                                    activeClassName="btn-light-green"
                                    to="/player">
                                    <span className="nav-link waves-effect waves-light" href="#">Player</span>
                                </NavLink>
                                <NavLink
                                    className="nav-item btn btn-mdb-color waves-effect sp-nav-btn"
                                    activeClassName="btn-light-green"
                                    to="/match">
                                    <span className="nav-link waves-effect waves-light" href="#">Match</span>
                                </NavLink>
                            </ul>)
                        }
                        {
                            userService.loggedIn() &&
                            <ul className="navbar-nav ml-auto nav-flex-icons">
                                <li
                                    className={`nav-item`}>
                                    <NavLink
                                        className="nav-item btn btn-mdb-color waves-effect sp-nav-btn"
                                        activeClassName="btn-light-green"
                                        to="/settings">
                                        <span className="nav-link waves-effect waves-light" href="#">Settings</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={`nav-item dropdown ${this.state.isToggled ? 'show' : ''}`}
                                    ref={this.setWrapperRef}>

                                    <a
                                        className="nav-link dropdown-toggle waves-effect waves-light"
                                        id="navbarDropdownMenuLink"
                                        href="/#"
                                        onClick={this.toggleProfile}>
                                        <i className="fas fa-user"></i>
                                        <span className='sp-up-name'>{userProfile.name}</span>
                                    </a>
                                    <div
                                        className={`dropdown-menu dropdown-menu-right dropdown-danger ${this.state.isToggled ? 'show' : ''}`}>
                                        <a
                                            className={`dropdown-item waves-effect waves-light`}
                                            href="!#">
                                            {userProfile.email}
                                        </a>
                                        <center>
                                            <button
                                                className="btn btn-danger"
                                                onClick={this.handleLogout}>
                                                Logout
                                            </button>
                                        </center>

                                    </div>
                                </li>
                            </ul>
                        }
                    </div>
                </nav>
            </section>
        );
    }
}

export default NavBar;