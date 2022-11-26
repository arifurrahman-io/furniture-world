import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";


const AllSellers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://furniture-world-server.vercel.app/users/seller');
            const data = await res.json();
            return data;
        }
    })


    const handleVerify = email => {
        fetch(`https://furniture-world-server.vercel.app/seller/status/verify/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Verified Successfully.');
                    refetch();
                }
            })
    }

    const handleUnVerify = email => {
        fetch(`https://furniture-world-server.vercel.app/seller/status/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Unverified Successfully.');
                    refetch();
                }
            })
    }

    const handleDelete = id => {
        const agree = window.confirm(`Are you sure to delete the seller?`)
        if (agree) {
            fetch(`https://furniture-world-server.vercel.app/seller/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Seller deleted successfully!')
                        refetch();
                    }
                });
        }
    }

    return (
        <div>
            <h2 className="text-xl text-center pb-2 font-semibold">Seller List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length && users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.status === 'unverified' &&
                                        <>
                                            <button onClick={() => handleVerify(user?.email)} className='btn btn-primary btn-xs'>Verify</button>
                                        </>

                                    }
                                    {
                                        user.status === 'verified' &&
                                        <>
                                            <p className='text-[#a0a0e8] flex style'><FaCheckCircle />Verified</p>
                                            <button onClick={() => handleUnVerify(user?.email)} className='btn btn-primary btn-xs'><FaCheckCircle />Unverify</button>
                                        </>
                                    }
                                </td>
                                <td><button onClick={() => handleDelete(user._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;