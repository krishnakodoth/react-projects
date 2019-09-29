import React, { Fragment } from 'react';
import Slider from '../../containers/Slider';
import { Helmet } from 'react-helmet';
const home = () => (
    <Fragment>
        <Helmet>
            <title>Home Page</title>
            <meta name="description" content="Shuttle players expense management" />
        </Helmet>
        <div className="col-md-10 offset-md-1">
            <h1 className="sp-title">Welcome to sharePay !</h1>
            <Slider />
        </div>
    </Fragment>

);
export default home;