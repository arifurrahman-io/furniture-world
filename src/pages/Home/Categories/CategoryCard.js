import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {

    const { _id, image, categoryName } = category;


    return (
        <div className="card w-full md:w-56 bg-orange-100 shadow-xl m-4">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl w-full" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="text-lg">{categoryName}</h2>
            </div>
            <Link to={`/category/${_id}`} className="text-center btn btn-warning text-white">View All</Link>
        </div>
    );
};

export default CategoryCard;