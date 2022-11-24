import React from 'react';

const CategoryCard = ({ category }) => {

    const { image, categoryName } = category;

    return (
        <div className="card w-full md:w-56 bg-base-100 shadow-xl m-4">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl w-full" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="text-lg">{categoryName}</h2>
            </div>
        </div>
    );
};

export default CategoryCard;