import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { userService } from '../_services/user.service';

class Footer extends Component {
    render() {
        return (
            <footer id="footer" className="page-footer unique-color-dark mt-4">
                <div className="info-color-dark text-center py-4">
                    {
                        userService.loggedIn() &&
                        <React.Fragment>
                            <NavLink
                                className="border rounded p-2 px-3 mr-4 d-none d-md-inline-block"
                                activeClassName="btn-light-green"
                                to="/contact">
                                Contact
                                <i className="fas fa-envelope white-text ml-2"> </i>
                            </NavLink>

                            <a rel="noopener noreferrer" target="_blank" id="footer-link-youtube" href="https://www.youtube.com/watch?v=cXTThxoywNQ">
                                <i className="fab fa-youtube white-text mr-4"> </i>
                            </a>
                            <a rel="nofollow noopener noreferrer" target="_blank" id="footer-link-facebook" href="https://www.facebook.com/mdbootstrap">
                                <i className="fab fa-facebook-f white-text mr-4"> </i>
                            </a>
                            <a rel="nofollow noopener noreferrer" target="_blank" id="footer-link-twitter" href="https://twitter.com/MDBootstrap">
                                <i className="fab fa-twitter white-text"> </i>
                            </a>
                        </React.Fragment>
                    }

                </div>

                <div className="footer-copyright py-3 text-center">
                    <a href="https://www.MDBootstrap.com" rel="noopener noreferrer">
                        <strong> sharePay</strong>
                    </a>
                    &nbsp;
                     © 2019

                </div>
            </footer>
        );
    }
}

export default Footer;