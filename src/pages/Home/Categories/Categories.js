import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import CategoryCard from './CategoryCard';

const Categories = () => {

    const { loading } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, []);


    if (loading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <h2 className='text-2xl py-5 text-center'>Categories</h2>
            <div className='flex justify-center'>
                {
                    categories?.length && categories.map(category => <CategoryCard
                        key={category._id}
                        category={category}
                    ></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;