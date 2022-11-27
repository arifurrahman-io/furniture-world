import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaMapSigns, FaDollarSign, FaRegClock, FaConfluence, FaCheckCircle, FaClipboardList } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider';
import useVerified from '../../hooks/useVerified';
import '../../pages/Products/Products.css';


const Product = ({ product, setSelectedProduct }) => {

    const { user } = useContext(AuthContext);

    const [isVerified] = useVerified(product.sellerEmail);

    const { name, image, price, newPrice, location, description, purchaseYear, condition, uploadDate, uploadTime, sellerName } = product;

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
                toast.success(`${wishlistItem.productName} added successfully`);
            })

    }

    return (
        <div className='shadow bg-orange-50 m-2 p-2 lg:py-6 lg:px-6'>
            <div className='md:flex justify-center '>
                <div className='md:w-1/2 lg:w-96'><img src={image} alt="furniture" className='p-4 my-auto' /></div>
                <div className='my-auto p-4 md:w-1/2'>
                    <div>
                        <h2 className="card-title mb-2">{name}</h2>
                        <h4 className='text-lg font-semibold my-2'>Short Description:</h4>
                        <div className='px-4 md:px-12 my-auto text-lg font-semibold'>
                            <div className='style'><FaDollarSign className='mr-2 text-yellow-600' /> <p>Selling Price:${price}</p></div>
                            <div className='style'><FaDollarSign className='mr-2 text-yellow-600' /><p className='line-through'>New Product: ${newPrice}</p> </div>
                            <div className='style'><FaRegClock className='mr-2 text-yellow-600' />Year of purchase: {purchaseYear}</div>
                            <div className='style'><FaConfluence className='mr-2 text-yellow-600' />Condition: {condition}</div>
                            <div className='style'><FaMapSigns className='mr-2 text-yellow-600' /><p>Location: {location}</p> </div>
                            <div className='style'><FaRegClock className='mr-2 text-yellow-600' />Published on {uploadDate} at {uploadTime}</div>
                        </div>

                        <div className="my-2">
                            {isVerified &&
                                <>
                                    <div className='style my-2'>Seller: {sellerName} <FaCheckCircle className='ml-2 text-blue-600' /></div>
                                </>
                            }
                            {!isVerified &&
                                <div className='style my-2'>Seller: {sellerName}</div>
                            }


                            <div className='flex'>
                                <label htmlFor="booking-modal" className="btn btn-warning" onClick={() => setSelectedProduct(product)}>Book Now</label>
                                <label onClick={() => handleWish(wishlistItem)} className='ml-10 btn btn-sm my-auto'><FaClipboardList className='text-lg  text-purple-500' />Add to Wishlist</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-2 mx-5 lg:mx-20'>
                <h4 className='text-lg font-semibold'>Description:</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Product;