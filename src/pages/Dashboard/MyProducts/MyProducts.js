import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';
import { FaCheckCircle } from "react-icons/fa";
import '../../Products/Products.css';

const MyProducts = () => {
    const { user } = useContext(AuthContext);


    const url = `https://furniture-world-server.vercel.app/myproducts?email=${user?.email}`;

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
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

    const handleAdvertise = id => {
        fetch(`https://furniture-world-server.vercel.app/myproducts/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Advertised Successfully.');
                    refetch();
                }
            })
    }

    const handleUnlist = id => {
        fetch(`https://furniture-world-server.vercel.app/myproducts/status/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Unlisted Successfully.');
                    refetch();
                }
            })
    }



    const handleDelete = id => {
        const agree = window.confirm(`Are you sure to delete the product?`)
        if (agree) {
            fetch(`https://furniture-world-server.vercel.app/myproducts/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Product deleted successfully!')
                        refetch();
                    }
                });
        }
    }

    if (products.length === 0) {
        return <p className='text-xl font-semibold text-center'>No Products Found!</p>
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length && products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><img src={product.image} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    {
                                        product.status === 'unlisted' &&
                                        <>
                                            <button onClick={() => handleAdvertise(product?._id)} className='btn btn-primary btn-xs'>Advertise</button>
                                        </>

                                    }
                                    {
                                        product.status === 'advertised' &&
                                        <>
                                            <p className='text-[#a0a0e8] flex style'><FaCheckCircle />Advertised</p>
                                            <button onClick={() => handleUnlist(product?._id)} className='btn btn-primary btn-xs'><FaCheckCircle />Make Unavailable</button>
                                        </>
                                    }

                                </td>
                                <td>
                                    <button onClick={() => handleDelete(product?._id)} className='btn bg-rose-500 border-0 btn-xs mx-1'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;