import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Products/BookingModal/BookingModal';
import Products from '../Products/Products';

const Category = () => {

    const products = useLoaderData();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div>
            <Helmet>
                <title>Product Category | Furniture World</title>
            </Helmet>
            <div className='grid grid-cols-1 gap-5'>
                {
                    products?.length && products.filter(product => product.status === 'advertised').map(product => <Products
                        key={product._id}
                        product={product}
                        setSelectedProduct={setSelectedProduct}
                    ></Products>)
                }
            </div>
            {
                selectedProduct &&
                <BookingModal
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                ></BookingModal>}
        </div>
    );
};

export default Category;