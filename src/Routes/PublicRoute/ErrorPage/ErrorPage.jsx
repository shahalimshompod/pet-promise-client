import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import errorAnimation from '../../../assets/lotties/error.json';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: errorAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-3 xl:px-0">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 poppins">Oops! Page not found</h2>
                <p className="text-lg font-light mb-6 roboto">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <button
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition nunito"
                >
                    Go Back
                </button>
            </div>

            {/* Lottie Animation */}
            <Lottie options={defaultOptions} height={400} width={300} />
        </div>
    );
};

export default ErrorPage;
