import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const AddProduct = () => {

    const { user } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate()

    const { data: productCategories, isLoading } = useQuery({
        queryKey: ['categoryName'],
        queryFn: async () => {
            const res = await fetch(' http://localhost:5000/productCategory');
            const data = await res.json();
            return data;
        }
    })

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const currentTime = new Date();

    const time = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleAddProduct = data => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        name: data.name,
                        categoryID: data.category,
                        material: data.material,
                        description: data.description,
                        price: data.price,
                        newPrice: data.newPrice,
                        location: data.location,
                        time: data.time,
                        image: imgData.data.url,
                        uploadDate: date,
                        uploadTime: time,
                        sellerEmail: user.email,
                        sellerName: user.displayName
                    }
                    // save product info to db
                    fetch(' http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `berear ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success(`${product.name} added successfully`);
                            navigate('/dashboard/addproduct');
                        })
                }
            })

    }

    if (isLoading) {
        return <p>Loading...</p>
    }


    return (
        <div className='w-full px-6 md:px-12 lg:px-20 p-7'>
            <h3 className="text-3xl">Add A Product</h3>
            <form onSubmit={handleSubmit(handleAddProduct)}>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">Product Name</span></label>
                    <input type='text' {...register("name", { required: "Product name is Required." })} className="input input-bordered w-full" />
                    {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Category</span></label>
                        <select
                            {...register("category", { required: "Category is Required." })}
                            className="select input-bordered w-full  text-black">
                            {
                                productCategories.map(productCategory => <option
                                    key={productCategory._id}
                                    value={productCategory._id}
                                >{productCategory.categoryName}</option>)
                            }

                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Material</span></label>
                        <select
                            {...register("material", { required: "Material is Required." })}
                            className="select input-bordered w-full  text-black">
                            <option value="Wood" selected>Wood</option>
                            <option value="Wood">Fibar</option>
                            <option value="Wood">Metal</option>

                        </select>
                    </div>
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">Product Details</span></label>
                    <textarea type='text' {...register("description", { required: "Product Detail is Required." })} className="input input-bordered w-full p-5 h-36" />
                    {errors.description && <p className='text-red-600' role="alert">{errors.description?.message}</p>}
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Selling Price</span></label>
                        <input type='number' {...register("price", { required: "Selling Price is Required." })} className="input input-bordered w-full " />
                        {errors.price && <p className='text-red-600' role="alert">{errors.price?.message}</p>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Original Price</span></label>
                        <input type='number' {...register("newPrice", { required: "Original Price is Required." })} className="input input-bordered w-full " />
                        {errors.newPrice && <p className='text-red-600' role="alert">{errors.newPrice?.message}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">Location</span></label>
                        <input type='text' {...register("location", { required: "Location is Required." })} className="input input-bordered w-full " />
                        {errors.location && <p className='text-red-600' role="alert">{errors.location?.message}</p>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text">How many month/years you used it?</span></label>
                        <input type='text' {...register("time", { required: "Used Time is Required." })} className="input input-bordered w-full " />
                        {errors.time && <p className='text-red-600' role="alert">{errors.time?.message}</p>}
                    </div>
                </div>

                <div className="form-control w-full ">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input type='file' {...register("image", { required: "Photo is Required." })} className="input input-bordered w-full " />
                    {errors.image && <p className='text-red-600' role="alert">{errors.image?.message}</p>}
                </div>

                <input className='btn btn-accent w-full mt-5' value='Add Product' type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;