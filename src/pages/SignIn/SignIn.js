import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';
import img from '../../assets/signup.png';

const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);

    const { loginError, setLoginError } = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {

                setLoginUserEmail(data.email);

            })
            .catch(err => {
                console.error(err.message);
                setLoginError(err.message);
            })
    }



    return (
        <div className="hero py-8 lg:py-16">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <img src={img} alt="" />
                </div>
                <div onSubmit={handleSubmit} className="card w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(handleLogin)}>

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

                        <input className='btn btn-accent w-full mt-5' value='Signup' type="submit" />

                        <div>
                            {loginError && <p>{loginError} why not?</p>}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;