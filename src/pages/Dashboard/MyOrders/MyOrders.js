import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [booking, setBooking] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setBooking(data))

    }, [user?.email]);


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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.length && booking.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td><img src={user.image} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{user.productName}</td>
                                <td>{user.price}</td>
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