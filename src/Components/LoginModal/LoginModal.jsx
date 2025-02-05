import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LoginModal = ({
    petForAdopt,
    setPetForAdopt,
    signInWithGoogle,
    signInWithFacebook,
    setUser,
}) => {
    const axiosPublic = useAxiosPublic();
    const [googleLoginLoader, setGoogleLoginLoader] = useState(false);
    const [facebookLoginLoader, setFacebookLoginLoader] = useState(false);

    // Handle Google sign-in
    const googleLogin = () => {
        setGoogleLoginLoader(true);
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                };

                axiosPublic.post("/users", userInfo).then((res) => { });
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Logged in successfully",
                });
            })
            .catch((err) => {
                setGoogleLoginLoader(false);
                console.error("ERROR LOGGING IN USER WITH GOOGLE -->", err);
                Swal.fire({
                    title: 'Error!',
                    text: `${err}`,
                    icon: 'error',
                })
            });
    };

    // Handle Facebook sign-in
    const facebookLogin = () => {
        setFacebookLoginLoader(true);
        signInWithFacebook()
            .then((result) => {
                const user = result.user;
                setUser(user);

                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                };

                axiosPublic.post("/users", userInfo).then((res) => { });

                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Logged in successfully",
                });

                setFacebookLoginLoader(false);
            })
            .catch((error) => {
                console.error("ERROR LOGGING IN USER WITH FACEBOOK -->", error);
                setFacebookLoginLoader(false);
                Swal.fire({
                    title: 'Error!',
                    text: `${error}`,
                    icon: 'error',
                })
            });
    };

    if (!petForAdopt) return null;

    return (
        <AnimatePresence>
            {petForAdopt && (
                <motion.div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[1000] px-3 xl:px-0"
                    initial={{ opacity: 0 }} // Initial fade-in
                    animate={{ opacity: 1 }} // Animate to full opacity
                    exit={{ opacity: 0 }} // Fade out on close
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white rounded-lg shadow-lg lg:w-1/5 p-3"
                        initial={{ scale: 0.8, opacity: 0 }} // Initial scale-down and fade-in
                        animate={{ scale: 1, opacity: 1 }} // Scale up to normal size and full opacity
                        exit={{ scale: 0.8, opacity: 0 }} // Scale down and fade-out on close
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div></div>
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => setPetForAdopt(null)}
                            >
                                &times;
                            </button>
                        </div>
                        <h1 className="poppins text-2xl text-center">
                            User must log in or sign up to perform these kinds of actions.
                        </h1>

                        <p className="text-center my-3 nunito">Continue with:</p>
                        <hr />
                        {/* Sign in with Google and Facebook Buttons */}
                        <div className="flex items-center gap-3 justify-center mt-3">
                            {/* Google login */}
                            <button
                                onClick={googleLogin}
                                className="p-2 rounded-full border transition hover:bg-red-50"
                            >
                                {googleLoginLoader ? (
                                    <SpinnerDotted
                                        size={30}
                                        thickness={100}
                                        speed={100}
                                        color="rgba(57, 124, 172, 1)"
                                    />
                                ) : (
                                    <FcGoogle size={30} />
                                )}
                            </button>

                            <span>or</span>

                            {/* Facebook login */}
                            <button
                                onClick={facebookLogin}
                                className="p-2 rounded-full border transition hover:bg-cyan-50"
                            >
                                {facebookLoginLoader ? (
                                    <SpinnerDotted
                                        size={30}
                                        thickness={100}
                                        speed={100}
                                        color="rgba(57, 129, 172, 1)"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="31"
                                        height="31"
                                        viewBox="0 0 48 48"
                                    >
                                        <linearGradient
                                            id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                                            x1="9.993"
                                            x2="40.615"
                                            y1="9.993"
                                            y2="40.615"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#2aa4f4"></stop>
                                            <stop offset="1" stopColor="#007ad9"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                                            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                                        ></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
