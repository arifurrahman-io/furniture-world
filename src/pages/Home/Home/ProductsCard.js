import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import {
    FaMapMarkerAlt, FaClock, FaRegUserCircle, FaCheckCircle, FaMoneyCheckAlt,
    FaAngellist, FaCreativeCommonsNc, FaFontAwesomeFlag, FaLuggageCart, FaHeart
} from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthProvider';
import useVerified from '../../../hooks/useVerified';
import Loading from '../../../shared/Loading/Loading';
import '../../Products/Products.css';

const ProductsCard = ({ product, setSelectedProduct }) => {

    const { user, loading } = useContext(AuthContext);
    const [isVerified] = useVerified(product.sellerEmail);

    const { name, price, newPrice, location, time, image, uploadDate, uploadTime, sellerName, condition } = product;

    const wishlistItem = {
        productID: product._id,
        productName: product.name,
        imageUrl: product.image,
        price: product.price,
        email: user?.email,
        buyer: user?.displayName,
        location: product.location,
        phone: product.phone

    }

    const handleWish = (wishlistItem) => {
        fetch(' https://furniture-world-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `berear ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(wishlistItem)
        })
            .then(res => res.json())
            .then(result => {
                toast.success(`${wishlistItem.productName} added to your wishlist`);
            })

    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="card h-[450px] card-compact bg-base-100 shadow-xl">
            <figure className='h-2/5'><img src={image} alt="Product" className='' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className=''>
                    {isVerified &&
                        <>
                            <div className='style my-2'><FaRegUserCircle className='mr-2 text-teal-500 text-xl' /> {sellerName} <FaCheckCircle className='ml-2 text-blue-600' /></div>
                        </>
                    }
                    {!isVerified &&
                        <div className='style my-2'><FaRegUserCircle className='mr-2 text-teal-500 text-xl' /> {sellerName}</div>
                    }
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

                <div className="card-actions justify-between mb-0 my-auto">
                    <label htmlFor="booking-modal" onClick={() => setSelectedProduct(product)} className="btn btn-active btn-primary"><FaLuggageCart className='mr-2 text-lg' />Book</label>
                    <button onClick={() => handleWish(wishlistItem)} className="btn btn-outline btn-primary"><FaHeart className='mr-2 text-lg' /> Wishlist</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;