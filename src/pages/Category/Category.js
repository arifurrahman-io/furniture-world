import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Products/BookingModal/BookingModal';
import Products from '../Products/Products';

const Category = () => {

    const products = useLoaderData();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div>
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