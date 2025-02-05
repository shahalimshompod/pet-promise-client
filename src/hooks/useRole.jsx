import { useContext } from 'react';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    // getting current user email
    const { user } = useContext(AuthContext);
    const currentUserEmail = user.email;

    // query function
    const fetchRoles = async () => {
        const res = await axiosSecure.get(`/user-role?email=${currentUserEmail}`)
        return res.data;
    }
    return useQuery({
        queryKey: ['user-role'],
        queryFn: fetchRoles,
    });
};

export default useRole;