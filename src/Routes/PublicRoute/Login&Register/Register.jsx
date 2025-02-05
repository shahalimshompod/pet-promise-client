import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { SpinnerDotted } from "spinners-react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

// IMAGE HOSTING KEY
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// image hosting api
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const axiosPublic = useAxiosPublic();
    const { signInWithGoogle, setUser, signInWithFacebook, updateUser, createUser, } = useContext(AuthContext)

    // loading states
    const [registerLoader, setRegisterLoader] = useState(false);
    const [googleLoginLoader, setGoogleLoginLoader] = useState(false)
    const [facebookLoginLoader, setFacebookLoginLoader] = useState(false)

    // error states
    const [registerError, setRegisterError] = useState({})

    // states for toggle button show and hide password
    const [show, setShow] = useState(false);

    const handleToggleShowAndHide = () => {
        setShow(!show)
    }




    // FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setRegisterLoader(true)
        const name = data.name
        const email = data.email;
        const password = data.password;
        const imageFile = { image: data.image[0] }

        // create user here
        createUser(email, password)
            .then(async (result) => {
                const loggedUser = result.user;

                // set logged in user
                setUser(loggedUser)

                // hosting image to imgbb
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })

                // get image link from imgbb
                const image = res.data.data.display_url;

                // updating user while creating
                updateUser({ displayName: name, photoURL: image })

                // user info to be added in database
                const userInfo = {
                    name: name,
                    email: email,
                    image: image,
                }

                // add to database
                const response = await axiosPublic.post('/users', userInfo)
                if (response.data.insertedId) {
                    // alert
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Registered successfully"
                    });

                    // stop the loader
                    setRegisterLoader(false)

                    // navigate to the desired route
                    navigate(location?.state ? location.state : '/')
                }
            }).catch(error => {
                const errorCode = error.code;
                setRegisterError({ ...registerError, register: errorCode })
                setRegisterLoader(false)
            })
    };

    // handle google sign in
    const googleLogin = () => {
        setGoogleLoginLoader(true);
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                if (user) {
                    setUser(user);
                    // alert
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    setGoogleLoginLoader(false)
                }

                navigate(location?.state ? location.state : '/')
            }).catch(err => console.error('ERROR LOGGING IN USER -->', err))
    }


    // handle facebook sign in
    const facebookLogin = () => {
        setFacebookLoginLoader(true)
        signInWithFacebook()
            .then(result => {
                const user = result.user;
                if (user) {
                    setUser(user)
                    // alert
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });

                    setFacebookLoginLoader(false)
                }

                // navigate to the desired route
                navigate(location?.state ? location.state : '/')
            })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-8 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl text-center mb-6 poppins font-light">Create an account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm nunito font-thin">
                            Your name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Your Name"
                            className={`nunito w-full px-4 py-2 mt-2 rounded bg-white dark:bg-gray-700 border ${errors.name ? "border-red-500" : "border-gray-600"} text-black  dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1 roboto font-thin">{errors.name.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm nunito font-thin">
                            Your email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="example@website.com"
                            className={`nunito w-full px-4 py-2 mt-2 rounded bg-white dark:bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"} text-black  dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 roboto font-thin">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm nunito font-thin">
                            Your password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={show ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])/,
                                        message: "Password must include at least one uppercase letter",
                                    },
                                })}
                                placeholder="Your password"
                                className={`nunito w-full px-4 py-2 mt-2 rounded bg-white dark:bg-gray-700 border ${errors.password ? "border-red-500" : "border-gray-600"
                                    } text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {/* Show/Hide Password Button */}
                            <button
                                type="button"
                                onClick={handleToggleShowAndHide}
                                className="absolute right-3 top-7 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                            >
                                {show ? <BiHide size={25} /> : <BiShow size={25} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1 roboto font-thin">{errors.password.message}</p>
                        )}
                    </div>


                    {/* Image Upload Input */}
                    <div>
                        <label className="block text-sm nunito font-thin mb-2 text-gray-900 dark:text-white" for="file_input">Upload image</label>
                        <input
                            {...register("image", { required: "Image is required" })}
                            className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                        {errors.image && <p className="text-red-500 text-sm mt-1 roboto font-thin">{errors.image.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition nunito"
                    >
                        {
                            registerLoader ? <div className="flex flex-col items-center justify-center">
                                <SpinnerDotted size={25} thickness={167} speed={150} color="rgba(81, 57, 172, 1)" />
                            </div> : 'Register'
                        }

                    </button>
                    {
                        registerError && <p className="text-red-600">{registerError.register}</p>
                    }
                </form>

                {/* Or Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="mx-4 text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                {/* Sign in with Google and Facebook Buttons */}
                <div className="flex items-center gap-3 justify-center">

                    {/* google login */}
                    <button onClick={googleLogin} className="p-2 rounded-full border transition hover:bg-red-50">
                        {
                            googleLoginLoader ? <SpinnerDotted size={30} thickness={100} speed={100} color="rgba(57, 124, 172, 1)" /> : <FcGoogle size={30} />
                        }

                    </button>

                    {/* facebook login */}
                    <button onClick={facebookLogin} className="p-2 rounded-full border transition hover:bg-cyan-50">

                        {
                            facebookLoginLoader ? <SpinnerDotted size={30} thickness={100} speed={100} color="rgba(57, 124, 172, 1)" /> : (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="31" height="31" viewBox="0 0 48 48">
                                <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                            </svg>)
                        }

                    </button>
                </div>

                {/* Footer */}
                <div className="text-center mt-4 text-sm">
                    Already have an account? {" "}
                    <Link to='/login' className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
