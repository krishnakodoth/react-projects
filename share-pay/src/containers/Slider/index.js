import React, { Component } from 'react';
import Slide from './Slide';
import './Slider.css';


import img1 from '../../assets/slider/1.jpg';
import img2 from '../../assets/slider/2.png';
import img3 from '../../assets/slider/3.png';
import img4 from '../../assets/slider/4.jpg';
import img5 from '../../assets/slider/5.jpg';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                img1,
                img2,
                img3,
                img4,
                img5,
            ],
            currentIndex: 0,
            translateValue: 0,
            slideTimer: null
        }
    }

    componentDidMount = () => {
        let startInterval = setInterval(()=>{
           this.goToNextSlide()
        },3000);
        this.setState({
            slideTimer:startInterval
        })
    }

    componentWillUnmount = () => {
        let slideTimer = this.state.slideTimer;
        clearInterval(slideTimer);
        console.log('componentWillUnmount')
    }



    goToPrevSlide = () => {
        if (this.state.currentIndex === 0)
            return;

        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + this.slideWidth()
        }))
    }

    goToNextSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (this.state.currentIndex === this.state.images.length - 1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0
            })
        }

        // This will not run if we met the if condition above
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth())
        }));
    }

    slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }

    render() {
        return (
            <div className="slider">
                <div className="slider-wrapper"
                    style={{
                        transform: `translateX(${this.state.translateValue}px)`,
                        transition: 'transform ease-out 0.45s'
                    }}>
                    {
                        this.state.images.map((image, i) => (
                            <Slide key={i} image={image} />
                        ))
                    }
                </div>

                {
                    /*
                     <LeftArrow
                 goToPrevSlide={this.goToPrevSlide}
                />
        
                <RightArrow
                 goToNextSlide={this.goToNextSlide}
                />
                    */
                }



            </div>
        );
    }
}

/* const LeftArrow = (props) => {
    return (
        <div className="backArrow arrow" onClick={props.goToPrevSlide}>
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
        </div>
    );
}


const RightArrow = (props) => {
    return (
        <div className="nextArrow arrow" onClick={props.goToNextSlide}>
            <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
        </div>
    );
} */
