import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState({});
    const [buttonText, setButtonText] = useState("Advertise Now");

    useEffect(() => {
        fetch(`https://furniture-world-server.vercel.app/myproducts?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyProducts(data))

    }, [user?.email]);

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
                    setButtonText('Advertised');
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
                    }
                });
        }
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
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.length && myProducts.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><img src={product.image} alt="" className='w-[70px] rounded-xl' /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => handleAdvertise(product?._id)} className='btn btn-warning btn-xs mx-1'>{buttonText}</button>
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