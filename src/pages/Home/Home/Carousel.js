import React from 'react';
import img1 from '../../../assets/carousel1.jpg';
import img2 from '../../../assets/carousel2.jpg';
import img3 from '../../../assets/carousel3.jpg';
import './Carousel.css';

const Carousel = () => {
    return (
        <div className="carousel w-full py-5">
            <div id="slide1" className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={img1} className="w-full rounded-xl" alt='' />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-10 md:left-24 top-1/4">
                    <h1 className='text-md lg:text-6xl font-bold text-white'>Buy used furniture, <br /> it's affordable</h1>
                </div>
                <div className="absolute flex justify-end w-2/5 transform -translate-y-1/2 left-10 md:left-24 top-3/4 md:top-1/2">
                    <p className='text-white text-sm lg:text-xl'>Furniture world is a great platform to buy or sell your used furniture...</p>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={img2} className="w-full rounded-xl" alt='' />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-10 md:left-24 top-1/4">
                    <h1 className='text-md lg:text-6xl font-bold text-white'>Buy used furniture, <br /> it's affordable</h1>
                </div>
                <div className="absolute flex justify-end w-2/5 transform -translate-y-1/2 left-10 md:left-24 top-3/4 md:top-1/2">
                    <p className='text-white text-sm lg:text-xl'>Furniture world is a great platform to buy or sell your used furniture...</p>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={img3} className="w-full rounded-xl" alt='' />
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-10 md:left-24 top-1/4">
                    <h1 className='text-md lg:text-6xl font-bold text-white'>Buy used furniture, <br /> it's affordable</h1>
                </div>
                <div className="absolute flex justify-end w-2/5 transform -translate-y-1/2 left-10 md:left-24 top-3/4 md:top-1/2">
                    <p className='text-white text-sm lg:text-xl'>Furniture world is a great platform to buy or sell your used furniture...</p>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Carousel;