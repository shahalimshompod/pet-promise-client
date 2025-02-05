import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const name = user?.displayName || "Guest";
    const email = user?.email || "Not Available";

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className='flex justify-center items-center w-full p-4'
        >
            <motion.div 
                className='bg-cyan-100 dark:bg-[#111827] w-full max-w-lg rounded-2xl border-2 border-cyan-500 p-6 shadow-xl'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <div className='flex flex-col items-center text-center'>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className='text-cyan-500 dark:text-cyan-400 text-6xl'
                    >
                        <FaUserCircle />
                    </motion.div>
                    <h1 className='text-2xl font-bold text-black dark:text-cyan-50 mt-4'>Welcome, {name}!</h1>
                    <p className='text-lg text-black/80 dark:text-cyan-200 mt-2'>Glad to have you here.</p>

                    <div className='mt-6 text-left w-full'>
                        <h2 className='text-lg font-semibold text-black dark:text-cyan-50'>Full Name:</h2>
                        <p className='text-black/80 dark:text-cyan-200 text-xl'>{name}</p>

                        <h2 className='text-lg font-semibold text-black dark:text-cyan-50 mt-4'>Email:</h2>
                        <p className='text-black/80 dark:text-cyan-200 text-xl'>{email}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MyProfile;
