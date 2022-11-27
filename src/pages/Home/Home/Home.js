import React from 'react';
import Categories from '../Categories/Categories';
import Carousel from '../Home/Carousel';
import AllProducts from '../Home/AllProducts';


const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Categories></Categories>
            <AllProducts></AllProducts>
        </div>
    );
};

export default Home;