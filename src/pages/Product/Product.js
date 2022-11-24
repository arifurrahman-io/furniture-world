import React from 'react';

const Product = ({ product }) => {

    const { name, image, price, newPrice, location, description, time, material, uploadDate, uploadTime } = product;


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{description}</p>
                <p>Price: {price}</p>
                <p>Purchase Price: {newPrice}</p>
                <p>Location: {location}</p>
                <p>Used: {time}</p>
                <p>Made by: {material}</p>
                <p>Uploaded: {uploadDate} {uploadTime}</p>
            </div>
        </div>
    );
};

export default Product;