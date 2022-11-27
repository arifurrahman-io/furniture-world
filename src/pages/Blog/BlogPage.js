import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaEye, FaThumbsUp } from "react-icons/fa";

const BlogPage = () => {

    const blog = useLoaderData();

    const { topic, image, views, likes, auther, autherImage, description } = blog;

    return (
        <div className="card card-compact bg-base-100 mx-5 my-5 md:mx-40">
            <figure className='md:h-1/2'><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{topic}</h2>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <h4><img src={autherImage} className="w-7 rounded-full" alt="" /></h4>
                        <h4 className='my-auto ml-3 font-semibold'>{auther}</h4>
                    </div>
                    <h5 className='flex style text-lg'><FaEye className='mr-2' /> {views}</h5>
                    <h5 className='flex style text-lg'><FaThumbsUp className='mr-2' />{likes}</h5>
                </div>
                <div className="flex justify-evenly my-auto bottom-0">

                </div>
                <div>
                    <h6 className='text-justify text-xl'>{description}</h6>
                </div>

            </div>
        </div>
    );
};

export default BlogPage;