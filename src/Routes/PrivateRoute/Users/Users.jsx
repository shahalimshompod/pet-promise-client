import React, { useState } from 'react';
import useUsers from '../../../hooks/useUsers';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const { data: usersData, isLoading, refetch } = useUsers(page);

    const users = usersData?.users;
    const totalUsers = usersData?.totalUsers || 0;
    const totalPages = Math.ceil(totalUsers / 10);

    // Pagination handler
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Date formatting
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        return { date: formattedDate, time: formattedTime };
    };

    const fieldForUpdateUserToAdmin = { role: "Admin" };
    const fieldForUpdateAdminToUser = { role: "User" };

    // Handle make admin function
    const handleMakeAdmin = async (id, role) => {
        const res = await axiosSecure.patch(`/make-admin/${id}`, role === "User" ? fieldForUpdateUserToAdmin : fieldForUpdateAdminToUser);
        if (res?.data.updatedUserRole) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role updated",
                showConfirmButton: false,
                timer: 1000
            });
            refetch();
        }
    };

    if(isLoading){
        return
    }

    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 py-6 px-6">
            <h1 className="text-2xl poppins dark:text-cyan-50 text-[#111827] font-bold mb-4">
                Total users: ({isLoading ? <Skeleton width={50} /> : users?.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3 poppins font-semibold text-xs lg:text-base">Name</th>
                            <th className="px-6 py-3 poppins font-semibold text-xs lg:text-base">User since</th>
                            <th className="px-6 py-3 poppins font-semibold text-xs lg:text-base">Current role</th>
                            <th className="px-6 py-3 poppins font-semibold text-xs lg:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, idx) => (
                                <tr key={idx} className="border-b bg-transparent border-cyan-500 hover:bg-white/20">
                                    <td className="px-6 py-4 flex items-center">
                                        <Skeleton circle height={40} width={40} />
                                        <div className="ps-3">
                                            <Skeleton width={120} height={15} />
                                            <Skeleton width={150} height={12} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><Skeleton width={120} /></td>
                                    <td className="px-6 py-4"><Skeleton width={80} /></td>
                                    <td className="px-6 py-4"><Skeleton width={100} height={30} /></td>
                                </tr>
                            ))
                            : users?.map((user, idx) => (
                                <tr key={idx} className="border-b bg-transparent border-cyan-500 hover:bg-white/20">
                                    <td className="px-6 py-4 flex items-center">
                                        <img className="w-10 h-10 rounded-full object-cover object-top" src={user.image} alt="User" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold poppins">{user.name}</div>
                                            <div className="font-normal text-gray-500 nunito">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 nunito">
                                        {formatDate(user.createdAt).date} | {formatDate(user.createdAt).time}
                                    </td>
                                    <td className="px-6 py-4 nunito">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleMakeAdmin(user._id, user.role)}
                                            type="button"
                                            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 nunito"
                                        >
                                            {user.role === "User" ? "Make Admin" : "Make User"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Buttons */}
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${page === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                            }`}
                    >
                        <IoIosArrowBack />
                    </button>
                    {[...Array(totalPages).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber + 1)}
                            className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${page === pageNumber + 1
                                ? 'bg-cyan-700 text-white dark:bg-gray-800'
                                : 'bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                                }`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`px-4 py-2 mx-1 text-sm font-medium rounded-lg ${page === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                            }`}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Users;
