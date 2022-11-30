import React, { useContext, useState } from 'react';
import img from '../../assets/signup.png';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../shared/Loading/Loading';
import Helmet from 'react-helmet';

const SignUp = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, loading } = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);


    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                toast.success('User Created Successfully!');
                const userInfo = {
                    displayName: data.name,
                    phoneNumber: data.phone
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.phone, data.userType);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }


    const saveUser = (name, email, phone, userType, status = 'unverified') => {
        const user = { name, email, phone, userType, status }
        fetch('https://furniture-world-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
    }



    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="hero py-8 lg:py-16">
            <Helmet>
                <title>Signup | Furniture World</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <img src={img} alt="" />
                </div>
                <div onSubmit={handleSubmit} className="card w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(handleSignUp)}>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type='text' {...register("name", { required: "Name is Required." })} className="input input-bordered w-full " />
                            {errors.name && <p className='text-red-600' role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Phone</span></label>
                            <input type='number' {...register("phone", { required: "Phone Number is Required." })} className="input input-bordered w-full " />
                            {errors.phone && <p className='text-red-600' role="alert">{errors.phone?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type='email' {...register("email", { required: "Email Address is Required." })} className="input input-bordered w-full " />
                            {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type='password' {...register("password", { required: "Password id Required", minLength: { value: 6, message: "Password must be 6 charecters or longer." }, pattern: { value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}/, message: "Password must be strong." } })} className="input input-bordered w-full" />
                            {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text">I am a</span></label>
                            <select {...register("userType")} className="input input-bordered w-full">
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        <input className='btn btn-accent w-full mt-5' value='Signup' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;