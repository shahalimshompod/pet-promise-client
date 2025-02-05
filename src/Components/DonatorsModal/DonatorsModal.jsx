import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { CircleLoader } from "react-spinners";

export default function DonatorsModal({ selectedCampaignForDonators, setSelectedCampaignForDonators }) {
    const axiosSecure = useAxiosSecure();

    // Query function to fetch donations
    const fetchDonations = async () => {
        const res = await axiosSecure.get(`/donators/${selectedCampaignForDonators._id}`);
        return res?.data;
    };

    const { data: donators, isLoading, isError } = useQuery({
        queryKey: ["donators"],
        queryFn: fetchDonations,
    });

    // Date formatting
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        return { date: formattedDate, time: formattedTime };
    };

    if (isLoading) {
        return (
            <div className="text-center my-8 flex flex-col items-center">
                <CircleLoader color="#3498db" loading={true} size={60} />
                <p className="mt-3 text-gray-500">More pets loading..</p>
            </div>
        )
    }

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {selectedCampaignForDonators && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }} // Initial animation (when opening)
                        animate={{ opacity: 1 }} // Animation when open
                        exit={{ opacity: 0 }} // Animation when closing
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="dark:bg-gray-800 bg-cyan-50 text-cyan-900 dark:text-cyan-50 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 max-h-[80%] overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0 }} // Scale down at start
                            animate={{ scale: 1, opacity: 1 }} // Scale up to full size
                            exit={{ scale: 0.8, opacity: 0 }} // Scale down when closing
                            transition={{ duration: 0.3 }}
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
                                <h2 className="text-lg font-semibold">Donators List</h2>
                                <button
                                    onClick={() => setSelectedCampaignForDonators(null)}
                                    className="text-gray-400 hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable List */}
                            <div className="p-4 overflow-y-scroll scrollbar-none max-h-96">
                                {donators?.length === 0 ? (
                                    <div className="text-center text-gray-400">No one donated yet.</div>
                                ) : (
                                    <table className="w-full text-left text-sm">
                                        <thead className=" top-0 bg-cyan-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="poppins px-2 py-2">#</th>
                                                <th className="poppins px-2 py-2 text-black/80 dark:text-cyan-50">Name</th>
                                                <th className="poppins px-2 text-black/80 dark:text-cyan-50">Time</th>
                                                <th className="poppins px-2 py-2 text-black/80 dark:text-cyan-50">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {donators?.map((donator, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? "dark:bg-gray-800 bg-cyan-50" : "dark:bg-gray-700 bg-cyan-50"
                                                        } hover:bg-gray-600`}
                                                >
                                                    <td className="px-2 py-2">{index + 1}</td>
                                                    <td className="px-2 py-2">
                                                        <div className="flex items-center gap-1">

                                                            <div>
                                                                <p className="nunito text-black dark:text-cyan-50">{donator?.name || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 nunito nunito text-black dark:text-cyan-50">{formatDate(donator?.createdAt).date} | {formatDate(donator?.createdAt).time}</td>
                                                    <td className="px-2 py-2 nunito nunito text-black dark:text-cyan-50">${donator?.donated_amount || "0"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="px-4 py-2 border-t border-gray-700 text-right">
                                <button
                                    onClick={() => setSelectedCampaignForDonators(false)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
