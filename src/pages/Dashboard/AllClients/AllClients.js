import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllClients = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://furniture-world-server.vercel.app/users/buyer');
            const data = await res.json();
            return data;
        }
    })

    const handleDelete = id => {
        const agree = window.confirm(`Are you sure to delete the buyer?`)
        if (agree) {
            fetch(`https://furniture-world-server.vercel.app/client/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Buyer deleted successfully!')
                        refetch();
                    }
                });
        }
    }

    return (
        <div>
            <h2 className="text-xl text-center pb-2 font-semibold">Buyer List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
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
                                <td><button onClick={() => handleDelete(user._id)} className='btn btn-warning btn-xs'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClients;