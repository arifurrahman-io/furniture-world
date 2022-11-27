import React from 'react';
import {
    FaMapMarkerAlt, FaClock, FaRegUserCircle, FaMoneyCheckAlt,
    FaAngellist, FaCreativeCommonsNc, FaFontAwesomeFlag, FaLuggageCart, FaHeart
} from 'react-icons/fa';
import '../../pages/Products/Products.css'

const ProductsCard = ({ product }) => {

    const { name, price, newPrice, location, time, image, uploadDate, uploadTime, sellerName, condition } = product;

    return (
        <div className="card h-[450px] card-compact bg-base-100 shadow-xl">
            <figure className='h-2/5'><img src={image} alt="Product" className='' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className='grid grid-cols-2 gap-2'>
                    <h4 className='flex style'><FaRegUserCircle className='mr-2 text-teal-500 text-xl' /> {sellerName}</h4>
                    <h4 className='flex style'><FaMapMarkerAlt className='mr-2 text-teal-500 text-xl' /> {location}</h4>
                </div>
                <h4 className='flex style'><FaClock className='mr-2 text-teal-500 text-xl' /> {uploadDate} {uploadTime}</h4>
                <div className='grid grid-cols-2 gap-2'>
                    <h4 className='flex style'><FaMoneyCheckAlt className='mr-2 text-teal-500 text-xl' /> ${price}</h4>
                    <h4 className='flex style'><FaCreativeCommonsNc className='mr-2 text-teal-500 text-xl' /> ${newPrice} (New one)</h4>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <h4 className='flex style'><FaFontAwesomeFlag className='mr-2 text-teal-500 text-xl' /> Bought in {time}</h4>
                    <h4 className='flex style'><FaAngellist className='mr-2 text-teal-500 text-xl' /> {condition} condition</h4>
                </div>

                <div className="card-actions justify-evenly mb-0 my-auto">
                    <button className="btn btn-active btn-primary"><FaLuggageCart className='mr-2 text-lg' />Book</button>
                    <button className="btn btn-outline btn-primary"><FaHeart className='mr-2 text-lg' /> Wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;