import React from 'react';
import { FaLongArrowAltRight, FaEye, FaThumbsUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../Products/Products.css'

const BlogCard = ({ blog }) => {

    const { _id, topic, image, views, likes, auther, autherImage, description } = blog;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure className='md:h-1/2'><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{topic}</h2>
                <div className='flex'>
                    <h4><img src={autherImage} className="w-7 rounded-full" alt="" /></h4>
                    <h4 className='my-auto ml-3 font-semibold'>{auther}</h4>
                </div>
                <div>
                    <h6>{description.length > 100 ?
                        description.slice(0, 100) : description}</h6>
                </div>
                <div className="flex justify-evenly my-auto bottom-0">
                    <h5 className='flex style text-lg'><FaEye className='mr-2' /> {views}</h5>
                    <h5 className='flex style text-lg'><FaThumbsUp className='mr-2' />{likes}</h5>
                    <Link to={`/blogpage/${_id}`} className="btn btn-ghost">Read More <FaLongArrowAltRight className='ml-2' /></Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;