import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContextProvider/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import useRole from '../../hooks/useRole';

const RedirectByRole = ({ children }) => {
    // getting user role
    const { data: role } = useRole();
    const navigate = useNavigate()
    // getting user from auth 
    const { user } = useContext(AuthContext);



    if (!user) {
        navigate('/login')
    }

    if (role !== "Admin") {
        navigate('/unauthorized-access')
    }

    return (
        <div className='w-full'>
            {children}
        </div>
    );
};

export default RedirectByRole;