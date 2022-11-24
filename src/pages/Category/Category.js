import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../Product/Product';

const Category = () => {

    const products = useLoaderData();

    return (
        <div>
            <p className='text-2xl'>Total {products?.length} products in this category</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products?.length && products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Category;