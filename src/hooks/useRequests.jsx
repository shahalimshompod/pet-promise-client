import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

const useRequests = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const currentUserEmail = user?.email;
    
    return (
        <div>
            
        </div>
    );
};

export default useRequests;