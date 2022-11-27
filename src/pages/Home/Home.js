import React from 'react';
import AllProducts from './AllProducts';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div>
            <h4>Home</h4>
            <Categories></Categories>
            <AllProducts></AllProducts>
        </div>
    );
};

export default Home;