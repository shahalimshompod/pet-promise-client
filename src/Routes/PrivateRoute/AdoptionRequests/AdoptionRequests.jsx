import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { CiViewList } from "react-icons/ci";
import RequestDetailsModal from '../../../Components/RequestDetailsModal/RequestDetailsModal';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AdoptionReqSkeleton from '../../../Components/SkeletonComponent/ListComponents/AdoptionReqSkeleton';
import { useNavigate } from 'react-router-dom';

const AdoptionRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user.email;
    const navigate = useNavigate()

    const [page, setPage] = useState(1);
    
    const limit = 5;

    // query function
    const fetchAllPets = async ({ queryKey }) => {
        const [, page] = queryKey;
        const res = await axiosSecure.get(`/adoption-requests?email=${email}&page=${page}&limit=${limit}`);
        return res?.data;
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['all-pets', page],
        queryFn: fetchAllPets,
        keepPreviousData: true,
    });

    // total page
    const totalPages = Math.ceil((data?.total || 0) / limit);

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

    // states for update modal
    const [selectedPets, setSelectedPets] = useState(null);

    // handle update button
    const handleManageRequest = (pet) => {
        setSelectedPets(pet)
    }

    useEffect(() => {
        if (selectedPets) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [selectedPets]);

    // return if loading exists.
    // if (isLoading) {
    //     return;
    // }
    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 py-6 px-3 lg:px-6">
            <h1 className="text-2xl poppins dark:text-cyan-50 text-[#111827] font-bold mb-4">
                Adoption Requests: ({data?.total})
            </h1>

            <div className="overflow-x-auto">
                <table className="w-[1200px] lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                    {/* Table head */}
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                S/N
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Pet Info
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Requested By
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Requestor Location
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <AdoptionReqSkeleton rows={5} />}
                        {data?.result?.map((petData, idx) => (
                            <tr
                                key={idx}
                                className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950"
                            >
                                <td className="px-6 py-4 text-center nunito">{idx + 1}</td>
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img
                                        className="w-20 h-20 rounded-xl object-cover object-top"
                                        src={petData.pet_image}
                                        alt="User"
                                    />
                                    <div className="ps-3">
                                        <div className="text-lg font-semibold poppins">{petData.pet_name}</div>
                                        <div className='mb-2'>
                                            <p className='nunito text-xs font-normal'> Requested: {formatDate(petData.createdAt).date} |{' '}
                                                {formatDate(petData.createdAt).time}</p>
                                        </div>
                                        <p className='nunito text-sm'>Category: {petData.pet_category}</p>

                                    </div>
                                </th>

                                <td className="px-6 py-4 ">
                                    <div className='flex items-center gap-1'>
                                        <div className=' overflow-hidden'>
                                            <img className='w-10 h-10 object-cover rounded-full' src={petData.requestorImage} alt="" />
                                        </div>
                                        <div className='flex flex-col items-start'>
                                            <p className='nunito text-xl font-bold text-center'>{petData.requestorName}</p>
                                            <p className='nunito text-xs text-center'>{petData.requestorEmail}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 ">
                                    {petData.requestorAddress}
                                </td>

                                <td>
                                    <div className='flex items-center justify-around'>
                                        <button onClick={() => handleManageRequest(petData)} className=" flex items-center gap-2 text-base bg-cyan-600 hover:bg-cyan-700 text-cyan-50 px-3 py-2 rounded-md ">
                                            <CiViewList size={20} /> View
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
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
            {data?.result?.length === 0 && (
                <div className="h-[50vh] flex flex-col gap-3 items-center">
                    <h1 className="text-center font-bold text-xl md:text-2xl mt-10 poppins uppercase text-black/80 dark:text-white/80">
                        nothing to show
                    </h1>
                </div>
            )}
            {
                selectedPets && <RequestDetailsModal selectedPets={selectedPets} setSelectedPets={setSelectedPets} refetch={refetch} />
            }
        </div>
    );
};

export default AdoptionRequests;
