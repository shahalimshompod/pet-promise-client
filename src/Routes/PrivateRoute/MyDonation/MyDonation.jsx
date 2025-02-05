import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { RiRefund2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MyDonationSkeleton from "../../../Components/SkeletonComponent/ListComponents/MyDonationSkeleton";

const MyDonation = () => {
    const { user } = useContext(AuthContext)
    const currentUserEmail = user?.email;
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const [page, setPage] = useState(1);
    
    const limit = 6;

    // query func
    const fetchDonationData = async ({ queryKey }) => {
        const [, page] = queryKey;
        const res = await axiosSecure.get(`/donation-history?email=${currentUserEmail}&page=${page}&limit=${limit}`)
       
        return res?.data
    }

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["donation-history", page],
        queryFn: fetchDonationData,
        keepPreviousData: true,
    })

    // total page
    const totalPages = Math.ceil((data?.total || 0) / limit);

    // Pagination handler
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // if (isLoading) {
    //     return
    // }

    // Date formatting
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        return { date: formattedDate, time: formattedTime };
    };


    // handle refund
    const handleRefund = async (campaignId, refundAmount, transactionID) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to refund!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Fetch donation details for the campaign
                    const donationResponse = await axiosSecure.get(`/donation-details-page-data/${campaignId}`);

                    if (donationResponse?.data) {
                        const totalDonatedAmount = donationResponse.data.donatedAmount;
                        const totalAmountAfterRefund = totalDonatedAmount - refundAmount;

                        if (totalAmountAfterRefund < 0) {
                            Swal.fire({
                                title: "Error!",
                                text: "Refund amount exceeds donated amount!",
                                icon: "error",
                            });
                            return;
                        }

                        // Prepare the updated donation amount
                        const finalAmount = {
                            donatedAmount: totalAmountAfterRefund,
                        };

                        // Update the donated amount
                        const updateResponse = await axiosSecure.patch(`/amount-change-for-refund/${campaignId}`, finalAmount);

                        if (updateResponse?.data?.updated) {
                            // Delete the payment after refund
                            const deleteResponse = await axiosSecure.delete(`/delete-payment-after-refund/${transactionID}`);

                            if (deleteResponse?.data?.deletedCount > 0) {
                                Swal.fire({
                                    title: "Success!",
                                    text: "Refund processed successfully.",
                                    icon: "success",
                                });
                                refetch(); // Refresh data after successful refund
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to delete the payment after refund.",
                                    icon: "error",
                                });
                            }
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to update the donation amount.",
                                icon: "error",
                            });
                        }
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "No donation data found for this campaign.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong. Please try again later.",
                        icon: "error",
                    });
                    console.error("Refund Error:", error);
                }
            }
        });
    };

    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 py-6 px-3 lg:px-6">
            <h1 className="text-2xl poppins dark:text-cyan-50 text-[#111827] font-bold mb-4">
                My Donations:
            </h1>

            <div className='overflow-x-auto'>
                <table className="w-[1000px] lg:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                    {/* Table head */}
                    <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Pet Image & Name
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Payment Status
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && <MyDonationSkeleton rows={6} />}
                        {
                            data?.result.map((item, idx) => (
                                <tr key={idx}
                                    className="border-b bg-transparent border-cyan-500 hover:bg-cyan-50 dark:hover:bg-gray-950"
                                >
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-20 h-20 rounded-xl object-cover object-top"
                                            src={item.campaign_image}
                                            alt="User"
                                        />
                                        <div className="ps-3">
                                            <div className="text-xl font-semibold poppins">{item.campaign_pet_name}</div>
                                            <p className='nunito text-xs font-light'>At: {formatDate(item.createdAt).date} | <br /> {formatDate(item.createdAt).time}</p>
                                        </div>

                                    </th>

                                    <td className="px-6 py-4 ">
                                        <p className="nunito font-bold">${item.donated_amount}</p>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        <p className="nunito font-bold bg-green-500 w-20 rounded text-cyan-50 text-center">{item.status && "Success"}</p>
                                    </td>

                                    <td>
                                        <div className='flex items-center justify-around'>
                                            <button
                                                onClick={() => handleRefund(item.campaign_id, item.donated_amount, item.transaction_id)}
                                                data-tooltip-id='refund-tooltip'
                                                data-tooltip-content='Refund Donation'
                                                className="text-red-500 hover:text-red-600">
                                                <RiRefund2Fill size={25} />
                                            </button>

                                            <Tooltip id='refund-tooltip' />

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
            {data?.result.length === 0 && (
                <div className="h-[50vh] flex flex-col gap-3 items-center">
                    <h1 className="text-center font-bold text-xl md:text-2xl mt-10 poppins uppercase text-black/80 dark:text-white/80">
                        nothing to show
                    </h1>
                    <button onClick={() => navigate('/donation-campaigns')} className='bg-cyan-500 dark:bg-cyan-900 py-2 px-4 rounded nunito text-cyan-50 hover:bg-cyan-600 dark:hover:bg-cyan-950'>
                        Make Donation
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyDonation;