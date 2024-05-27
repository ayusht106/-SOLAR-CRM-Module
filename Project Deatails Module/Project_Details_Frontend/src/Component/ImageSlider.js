import React from "react";
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import "../Css/ImageSlider.css" ;

const slideContents = [
    {
        image: '/loginss.png',
        content: 'Personalized Experience'
    },
    {
        image: '/Personalized.jpg',
        content: 'Get access to overall functionalities'
    },
    {
        image: '/loginss.png',
        content: 'Keep smart track of every aspect'
    }
];

function ImageSlider() {
    return (
        <div className='slide-container'>
            <Slide duration={2000}>
                {slideContents.map((slide, index) => (
                    <div key={index}>
                        <div className='slide-content'>
                            <img src={slide.image} />
                            <p>{slide.content}</p>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default ImageSlider;
