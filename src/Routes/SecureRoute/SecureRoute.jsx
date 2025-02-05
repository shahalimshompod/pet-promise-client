import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContextProvider/AuthContextProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

const SecureRoute = ({ children }) => {
    // getting user from auth 
    const { user, gettingUserLoading, } = useContext(AuthContext);
    const location = useLocation();

    // checking if there is any loading
    if (gettingUserLoading) {
        return (
            <div className="flex items-center justify-center h-screen dark:bg-[#111827] bg-cyan-50">
                <CircleLoader color="#3498db" loading={true} size={60} />
            </div>

        );
    }

    // checking if user exist
    if (user) {
        return children;
    }

    return (
        <div className='w-full'>
            <Navigate state={location.pathname} to="/login"></Navigate>
        </div>
    );
};

export default SecureRoute;