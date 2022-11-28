import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Helmet from 'react-helmet';
import BlogCard from './BlogCard';

const Blog = () => {

    const url = `https://furniture-world-server.vercel.app/blog`;

    const { data: blogs = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-5 my-10 md:mx-60 md:my-20'>
            <Helmet>
                <title>Blog | Furniture World</title>
            </Helmet>
            {
                blogs?.length && blogs.map(blog => <BlogCard
                    key={blog._id}
                    blog={blog}
                ></BlogCard>)
            }
        </div>
    );
};

export default Blog;