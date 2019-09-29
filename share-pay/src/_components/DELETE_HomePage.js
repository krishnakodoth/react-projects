import React, { Component } from 'react';


// '../../assets/slider/1.jpg';

// import { userService } from '../_services/user.service';
import NavBar from './NavBar';
import Footer from './Footer';
import Slider from '../containers/Slider';
class HomePage extends Component {
    
    render() {
        // const { user, users } = this.state;
        return (
            <React.Fragment>
                <NavBar />
                <div className="col-md-10 offset-md-1">
                    <h1 className="sp-title">Welcome to sharePay !</h1>
                    <Slider />
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default HomePage;