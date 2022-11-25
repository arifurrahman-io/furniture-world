import React from 'react';
import { FaMapSigns, FaDollarSign, FaRegClock, FaConfluence, FaCheckCircle } from "react-icons/fa";
import '../../pages/Products/Products.css';

const Product = ({ product, setSelectedProduct }) => {



    const { name, image, price, newPrice, location, description, time, material, uploadDate, uploadTime, sellerName } = product;


    return (
        <div className='md:flex justify-center shadow-xl m-3 p-3'>
            <div className='md:w-1/2'><img src={image} alt="furniture" className='p-4 my-auto' /></div>
            <div className='my-auto p-4 md:w-1/2'>
                <div>
                    <h2 className="card-title mb-2">{name}</h2>
                    <h4 className='text-lg font-semibold my-2'>Short Description:</h4>
                    <div className='px-12 md:px-4 my-auto text-lg font-semibold'>
                        <div className='style'><FaDollarSign className='mr-2 text-yellow-600' /> <p>Selling Price: {price}৳</p></div>
                        <div className='style'><FaDollarSign className='mr-2 text-yellow-600' /><p className='line-through'>New Product: {newPrice}৳</p> </div>
                        <div className='style'><FaMapSigns className='mr-2 text-yellow-600' /><p>Visit to buy: {location}</p> </div>
                        <div className='style'><FaRegClock className='mr-2 text-yellow-600' /> {time} Used</div>
                        <div className='style'><FaConfluence className='mr-2 text-yellow-600' />Material: {material}</div>
                        <div className='style'><FaRegClock className='mr-2 text-yellow-600' />Announced on: {uploadDate} at {uploadTime}</div>
                    </div>
                    <div className='my-2'>
                        <h4 className='text-lg font-semibold'>Description:</h4>
                        <p>{description}</p>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className='style'>Seller: {sellerName} <FaCheckCircle className='ml-2 text-blue-600' /></div>
                        <label htmlFor="booking-modal" className="btn btn-warning" onClick={() => setSelectedProduct(product)}>Book Now</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;