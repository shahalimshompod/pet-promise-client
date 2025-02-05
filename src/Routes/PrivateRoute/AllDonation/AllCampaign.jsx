import React, { useContext, useEffect, useState } from 'react';
import { FaPause, FaPlay, FaRegEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import { FaUsersViewfinder } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import CampaignUpdateModal from '../../../Components/CampaignUpdateModal/CampaignUpdateModal';
import DonatorsModal from '../../../Components/DonatorsModal/DonatorsModal';
import { MdDeleteForever } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AllCampaignSkeleton from '../../../Components/SkeletonComponent/ListComponents/AllCampaignSkeleton';
import { useNavigate } from 'react-router-dom';

const AllCampaign = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const currentUserEmail = user.email;
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    
    const limit = 6; // Number of items per page

    // query function
    const fetchAllCampaign = async ({ queryKey }) => {
        const [, page] = queryKey;
        const res = await axiosSecure.get(`/all-campaign-data?email=${currentUserEmail}&page=${page}&limit=${limit}`)
        
        return res?.data;
    }

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["all-campaign", page],
        queryFn: fetchAllCampaign,
        keepPreviousData: true,
    })

    const totalPages = Math.ceil((data?.totalCampaigns || 0) / limit);

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


    // Calculate progress percentage
    const progressFiller = (donatedAmount, maxDonation) => {
        const progressPercentage = (donatedAmount / maxDonation) * 100;
        return progressPercentage || 0;
    }

    // change is paused status
    const handleChangeStatus = async (id, currentStatus) => {
        

        if (!id) {

            Swal.fire({
                title: "Oops!",
                text: "Something went wrong. Please reload the page and try again later!",
                icon: "error"
            });

            return;

        }

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${currentStatus ? 'resume' : 'pause'} the campaign?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${currentStatus ? 'resume' : 'pause'} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const changedStatusToTrue = { isPaused: true }
                const changedStatusToFalse = { isPaused: false }
                const res = await axiosSecure.patch(`/change-isPaused-status/${id}`, currentStatus ? changedStatusToFalse : changedStatusToTrue)
                
                if (res?.data.updated) {
                    Swal.fire({
                        title: "Updated!",
                        text: `Campaign ${currentStatus ? 'resumed' : 'paused'} Successfully!`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        })
    }

    // selected campaign state
    const [selectedCampaign, setSelectedCampaign] = useState(null)
    const [selectedCampaignForDonators, setSelectedCampaignForDonators] = useState(null)

    // turning of background scrolling
    useEffect(() => {
        if (selectedCampaign) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [selectedCampaign]);

    

    // handle delete for all donation campaign
    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/delete-campaign/${id}`)
                    
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Campaign has been deleted.",
                            icon: "success",
                        });
                        // resetting data
                        refetch();
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    // stop background scrolling while open modal
    useEffect(() => {
        if (selectedCampaignForDonators) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [selectedCampaignForDonators]);


    // if (isLoading) {
    //     return
    // }

    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 py-6 px-3 lg:px-6">
            <h1 className="text-2xl poppins dark:text-cyan-50 text-[#111827] font-bold mb-4">
                All Donation Campaigns:
            </h1>

            <div className='overflow-x-auto'>
                <table className="w-[900px] lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                    {/* Table head */}
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Campaign
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Max Amount
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Progress
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && <AllCampaignSkeleton rows={6} />}
                        {
                            data?.campaigns.map((item, idx) => (
                                <tr key={idx}
                                    className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950"
                                >
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-20 h-20 rounded-xl object-cover object-top"
                                            src={item.petPicture}
                                            alt="User"
                                        />
                                        <div className="ps-3">
                                            <div className="text-xl font-semibold poppins">{item.petName}</div>
                                            <p className='nunito text-sm font-light'>Added: {formatDate(item.campaignAddedDate).date} | {formatDate(item.campaignAddedDate).time}</p>
                                        </div>
                                    </th>

                                    <td className="px-6 py-4 ">
                                        ${item.maxDonation}
                                    </td>

                                    <td className="px-6 py-4 ">
                                        <div className='flex items-center justify-evenly mb-1'>
                                            <span className="nunito">${item.donatedAmount}</span>
                                            <span className={`nunito ${item.expired ? 'bg-red-500' : item.isPaused ? 'bg-red-500' : 'bg-green-500'} text-cyan-50 rounded px-4`}>{item.expired ? 'Expired' : item.isPaused ? 'Paused' : 'Active'}</span>
                                        </div>
                                        {/* Progress Bar */}
                                        <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 transition-all duration-300"
                                                style={{ width: `${progressFiller(item.donatedAmount, item.maxDonation)}%` }}
                                            ></div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex items-center justify-around'>
                                            <button
                                                onClick={() => setSelectedCampaign(item)}
                                                data-tooltip-id='edit-tooltip'
                                                data-tooltip-content='Edit Campaign'
                                                className="text-cyan-500 hover:text-cyan-600">
                                                <FaRegEdit size={25} />
                                            </button>

                                            <button onClick={() => handleDelete(item?._id)} className="text-red-500 hover:text-red-700">
                                                <MdDeleteForever size={25} />
                                            </button>

                                            <button
                                                onClick={() => handleChangeStatus(item?._id, item?.isPaused)}
                                                data-tooltip-id='pause-play-tooltip'
                                                data-tooltip-content={item?.isPaused ? 'Resume' : 'Pause'}
                                                className={`hover:text-cyan-400 ${item.isPaused ? 'text-red-500' : 'text-green-400'}`}>
                                                {item?.isPaused ? <FaPlay size={22} /> : <FaPause size={22} />}
                                            </button>

                                            <button
                                                onClick={() => setSelectedCampaignForDonators(item)}
                                                data-tooltip-id='donators-tooltip'
                                                data-tooltip-content='View Donators'
                                                className="hover:text-cyan-400">
                                                <FaUsersViewfinder size={25} />
                                            </button>
                                            <Tooltip id='edit-tooltip' />
                                            <Tooltip id='pause-play-tooltip' />
                                            <Tooltip id='donators-tooltip' />
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
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
            {data?.campaigns.length === 0 && (
                <div className="h-[50vh] flex flex-col gap-3 items-center">
                    <h1 className="text-center font-bold text-xl md:text-2xl mt-10 poppins uppercase text-black/80 dark:text-white/80">
                        nothing to show
                    </h1>
                    <button onClick={() => navigate('/dashboard/create-donation-campaign')} className='bg-cyan-500 dark:bg-cyan-900 py-2 px-4 rounded nunito text-cyan-50 hover:bg-cyan-600 dark:hover:bg-cyan-950'>
                        Create Campaigns
                    </button>
                </div>
            )}
            {
                selectedCampaign && <CampaignUpdateModal selectedCampaign={selectedCampaign} setSelectedCampaign={setSelectedCampaign} refetch={refetch} />
            }

            {
                selectedCampaignForDonators && <DonatorsModal selectedCampaignForDonators={selectedCampaignForDonators} setSelectedCampaignForDonators={setSelectedCampaignForDonators} />
            }
        </div>
    );
};

export default AllCampaign;