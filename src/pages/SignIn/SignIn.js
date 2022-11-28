import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import useToken from '../../hooks/useToken';
import img from '../../assets/signup.png';
import img2 from '../../assets/google-signin-button.png';
import toast from 'react-hot-toast';
import { GoogleAuthProvider } from 'firebase/auth';
import Loading from '../../shared/Loading/Loading';
import { Helmet } from 'react-helmet';

const SignIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, providerLogin, loading } = useContext(AuthContext);

    const { loginError, setLoginError } = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail, createdUserEmail);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


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

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber
                }
                saveUser(newUser);
            })
            .catch(error => console.error(error));
    }

    const saveUser = (newUser) => {
        fetch(`https://furniture-world-server.vercel.app/user/${newUser.email}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Login Successful!')
                navigate(from, { replace: true });
                setCreatedUserEmail(newUser.email);
                if (token) {
                    navigate('/');
                }
            })
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="hero py-8 lg:py-16">
            <Helmet>
                <title>Signin | Furniture World</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full lg:w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card w-full lg:w-1/2">
                    <div onSubmit={handleSubmit} >
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

                            <input className='btn btn-accent w-full mt-5' value='Signin' type="submit" />

                            <div>
                                {loginError && <p>{loginError} why not?</p>}
                            </div>

                        </form>
                    </div>
                    <div className="divider">OR</div>
                    <div className="card rounded-box place-items-center">
                        <button onClick={handleGoogleSignIn}><img src={img2} alt="" className='w-1/2 mx-auto' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;