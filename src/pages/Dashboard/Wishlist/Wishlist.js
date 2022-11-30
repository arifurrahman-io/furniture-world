import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { user } = useContext(AuthContext);

    const url = `https://furniture-world-server.vercel.app/wishlist?email=${user?.email}`

    const { data: wishlist = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
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



    const handleDelete = id => {
        const agree = window.confirm(`Are you sure to delete the item?`)
        if (agree) {
            fetch(`https://furniture-world-server.vercel.app/wishlist/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Your order deleted successfully!')
                        refetch();
                    }
                });
        }
    }

    return (
        <div>
            <h2 className="text-xl text-center pb-2 font-semibold">My Wishlist</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlist.length && wishlist.map((wish, i) => <tr key={wish._id}>
                                <th>{i + 1}</th>
                                <td><img src={wish.imageUrl} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{wish.productName}</td>
                                <td>${wish.price}</td>
                                <td>
                                    {
                                        wish?.price && !wish?.paid &&
                                        <Link to={`/dashboard/payment/${wish._id}`}>
                                            <button className='btn btn-xs btn-primary'>Buy Now</button>
                                        </Link>
                                    }
                                    {
                                        wish?.price && wish?.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                                <td><button onClick={() => handleDelete(wish._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wishlist;