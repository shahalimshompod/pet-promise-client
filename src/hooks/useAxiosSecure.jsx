import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-petpromise-server.vercel.app'
    // baseURL: 'http://localhost:5000/'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')

        config.headers.authorization = `bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // interceptors status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;


        if (status === 401 || status === 403) {
            await userLogout()
            navigate('/unauthorized-access')
        }
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default useAxiosSecure;