import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })


    return (
        <div>
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
                            bookings.length && bookings.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td><img src={user.image} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{user.productName}</td>
                                <td>{user.price} Tk</td>
                                <td>
                                    {
                                        user?.price && !user?.paid &&
                                        <Link to={`/dashboard/payment/${user._id}`}>
                                            <button className='btn btn-xs btn-primary'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        user.price && user.paid && <span className='text-primary'>Paid</span>
                                    }
                                </td>
                                <td><button className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;