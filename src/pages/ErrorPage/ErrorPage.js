import React from 'react';
import Helmet from 'react-helmet';
import img from '../../assets/errorpage.jpg';

const ErrorPage = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-10 my-10'>
            <Helmet>
                <title>Page Not Found | Furniture World</title>
            </Helmet>
            <img src={img} alt="" />
            <h2 className='my-auto text-4xl font-bold'>May be you are in wrong route. Please check the url...</h2>
        </div>
    );
};

export default ErrorPage;