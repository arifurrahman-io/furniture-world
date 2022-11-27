import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import BookingModal from '../../Products/BookingModal/BookingModal';
import ProductsCard from '../Home/ProductsCard';

const AllProducts = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);

    const url = `https://furniture-world-server.vercel.app/allproducts`;

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className='my-24 mx-10'>
            <h2 className='text-center font-bold text-4xl my-10'>Latest Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    products?.length && products.filter(product => product.status === 'advertised').map(
                        product => <ProductsCard
                            key={product._id}
                            product={product}
                            setSelectedProduct={setSelectedProduct}
                        ></ProductsCard>
                    )
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

export default AllProducts;