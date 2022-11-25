import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Products/BookingModal/BookingModal';
import Products from '../Products/Products';

const Category = () => {

    const products = useLoaderData();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div>
            <p className='text-2xl'>Total {products?.length} products in this category</p>
            <div className='grid grid-cols-1 gap-5'>
                {
                    products?.length && products.map(product => <Products
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