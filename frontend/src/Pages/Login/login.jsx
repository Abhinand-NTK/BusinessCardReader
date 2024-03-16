
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from "../../api/userapi";

const LoginForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: async (values) => {
            try {
                const { email, password } = values;
                const data = { email, password };
                await userService.login(data);
                toast.success('Login successful');
                navigate('dashboard'); 
            } catch (error) {
                toast.error('Login failed');
                console.error('Error during login:', error);
            }
        }
    });

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-28 py-24">
                
                <div className="hidden md:block md:w-1/2 flex justify-center items-center">
                    <img
                        className="h-[29rem] md:h-auto"
                        src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/business-card-scanner%20%281%29.jpg?width=595&height=400&name=business-card-scanner%20%281%29.jpg"
                        alt=""
                    />
                </div>
                <div className="flex flex-col p-5 items-center w-full md:w-1/2">
                    <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                        <h4 className="block font-mono text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Login
                        </h4>
                        <form onSubmit={formik.handleSubmit} className="max-w-screen-lg mt-5 mb-2 w-80 sm:w-96">
                            <div className="flex flex-col gap-4 mb-1">
                                <h6 className="block text-sm -mb-3 font-sans  antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                    Your Email
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@mail.com"
                                        className="peer h-full w-full rounded-md border border-black border-opacity-20 focus:border-black focus:border-opacity-100 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <h6 className="block -mb-3 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                    Password
                                </h6>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="********"
                                        className="peer h-full w-full rounded-md border border-black border-opacity-20 focus:border-black focus:border-opacity-100 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                Sign in
                            </button>
                            <p className="block mt-4 font-sans text-sm antialiased font-normal leading-relaxed text-center text-gray-700">
                                Don't have an account?
                                <Link to="/sign-up/" className="font-medium text-gray-900">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
