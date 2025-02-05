import React, { useContext, useState } from 'react';
import TanstackTable from '../../../Components/TanstackTable/TanstackTable';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const MyAddedPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const currentUserEmail = user?.email;
    const navigate = useNavigate()

    const [page, setPage] = useState(1);
    const itemsPerPage = 10; // Number of pets per page

    // Fetch data function
    const fetchMyAddedPets = async ({ pageParam = 1 }) => {
        const response = await axiosSecure.get(
            `/my-added-pets?email=${currentUserEmail}&page=${pageParam}&limit=${itemsPerPage}`
        );
        return response?.data;
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['my-added-pets', page],
        queryFn: () => fetchMyAddedPets({ pageParam: page }),
        keepPreviousData: true,
    });

    const totalPages = Math.ceil((data?.totalPets || 0) / itemsPerPage);

    // Pagination Handler
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <TanstackTable data={data?.result} isLoading={isLoading} refetch={refetch} />
                {data?.result.length === 0 && (
                    <div className="h-[50vh] flex flex-col gap-3 items-center">
                        <h1 className="text-center font-bold text-xl md:text-2xl mt-10 poppins uppercase text-black/80 dark:text-white/80">
                            nothing to show
                        </h1>
                        <button onClick={() => navigate('/dashboard/add-a-pet')} className='bg-cyan-500 dark:bg-cyan-900 py-2 px-4 rounded nunito text-cyan-50 hover:bg-cyan-600 dark:hover:bg-cyan-950'>
                            Add Pets
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
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

export default MyAddedPets;
