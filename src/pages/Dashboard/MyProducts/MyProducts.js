import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/myproducts?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyProducts(data))

    }, [user?.email]);

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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.length && myProducts.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td><img src={user.image} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{user.name}</td>
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

export default MyProducts;