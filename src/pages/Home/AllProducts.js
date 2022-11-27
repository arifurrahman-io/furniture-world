import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from './ProductsCard';

const AllProducts = () => {


    const url = `http://localhost:5000/allproducts`;

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })



    return (
        <div className='my-24 mx-10'>
            <h2 className='text-center font-semibold text-2xl my-10'>Latest Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {
                    products?.length && products.filter(product => product.status === 'advertised').map(
                        product => <ProductsCard
                            key={product._id}
                            product={product}>
                        </ProductsCard>
                    )
                }
            </div>
        </div>
    );
};

export default AllProducts;