import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Loading from '../../../shared/Loading/Loading';
import CategoryCard from './CategoryCard';

const Categories = () => {

    const { loading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://furniture-world-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);



    if (loading) {
        return <Loading></Loading>
    }


    return (
        <section className='md:mx-50'>
            <h2 className='text-4xl py-5 font-bold text-center'>Categories</h2>
            <div className='flex flex-col md:flex-row justify-center'>
                {
                    categories?.length && categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>
        </section>
    );
};

export default Categories;