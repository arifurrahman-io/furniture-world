import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import Navebar from '../shared/Navebar/Navebar';

const Main = () => {
    return (
        <div>
            <Navebar></Navebar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;