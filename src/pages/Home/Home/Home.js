import React from 'react';
import Categories from '../Categories/Categories';
import Carousel from '../Home/Carousel';
import AllProducts from '../Home/AllProducts';
import TipsOfWood from './TipsOfWood';


const Home = () => {
    return (
        <div className='px-5'>
            <Carousel></Carousel>
            <Categories></Categories>
            <AllProducts></AllProducts>
            <TipsOfWood></TipsOfWood>
        </div>
    );
};

export default Home;