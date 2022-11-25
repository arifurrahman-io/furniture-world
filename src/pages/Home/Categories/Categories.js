import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
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
        return <p>Loading...</p>
    }


    return (
        <section className='md:mx-80'>
            <h2 className='text-2xl py-5 text-center'>Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
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