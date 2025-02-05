import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import UpdatePetModal from '../../../Components/UpdatePetModal/UpdatePetModal';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AllPetsSkeleton from '../../../Components/SkeletonComponent/ListComponents/AllPetsSkeleton';

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const email = user.email;

    const [page, setPage] = useState(1);
    
    const limit = 5; // Number of items per page

    // query function
    const fetchAllPets = async ({ queryKey }) => {
        const [, page] = queryKey;
        const res = await axiosSecure.get(`/all-pets?email=${email}&page=${page}&limit=${limit}`);
        // return res?.data;
        
        return res?.data
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['all-pets', page],
        queryFn: fetchAllPets,
        keepPreviousData: true,
    });

    const totalPages = Math.ceil((data?.total || 0) / limit);

    // Pagination handler
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    // handle delete pet
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
                    const res = await axiosSecure.delete(`/delete-pet/${id}`);
                    
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your pet has been deleted.",
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

    // Change status handler
    const handleChangeStatus = (id, currentPetStatus, currentRequestStatus) => {
        if (currentPetStatus === true && currentRequestStatus === false) {
            Swal.fire("Info!", "You can't change the status once it has been adopted.", "info");
            return
        }
        Swal.fire({
            title: "Change Status?",
            text: "Do you want to update the pet's status?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedPetStatus = { adopted: true };
                const updatedIsReqStatus = { isRequested: false, adopted: true }

                // if false we do nothing
                if (currentRequestStatus === true) {
                    axiosSecure.patch(`/change-pet-status/${id}`, updatedIsReqStatus).then((res) => {
                        if (res.data.updated) {
                            axiosSecure.patch(`/change-pet-status/${id}`, updatedPetStatus).then((res) => {
                                if (res.data.updated) {
                                    refetch();
                                    Swal.fire("Updated!", "The pet's status has been changed.", "success");
                                }
                            });
                        }
                    })
                    return;
                }

                // if true we do nothing
                if (currentPetStatus === false) {
                    axiosSecure.patch(`/change-pet-status/${id}`, updatedPetStatus).then((res) => {
                        if (res.data.updated) {
                            refetch();
                            Swal.fire("Updated!", "The pet's status has been changed.", "success");
                        }
                    });
                }


            }
        });
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
    const handleUpdatePet = (pet) => {
        setSelectedPets(pet)
    }

    // stop background scrolling while open modal
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


    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 py-6 px-3 lg:px-6">
            <h1 className="text-2xl poppins dark:text-cyan-50 text-[#111827] font-bold mb-4">
                Pets in total added by other users: ({data?.total})
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
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
                                Pet Category
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Added by
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Pet Location
                            </th>
                            <th scope="col" className="px-6 py-3 poppins font-semibold text-xs lg:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <AllPetsSkeleton rows={5} />}
                        {data?.pets?.map((petData, idx) => (
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
                                        <div className='mb-3'>
                                            <p className='nunito text-xs font-thin'> Added: {formatDate(petData.createdAt).date} |{' '}
                                                {formatDate(petData.createdAt).time}</p>
                                        </div>
                                        <div className="font-normal text-gray-500 nunito">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold  ${petData.isRequested
                                                ? 'bg-blue-100 text-blue-700'
                                                : petData.adopted === true
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {petData.isRequested ? 'Requested' : petData.adopted ? 'Adopted' : 'Not Adopted'}
                                            </span>
                                        </div>

                                    </div>
                                </th>

                                <td className="px-6 py-4 nunito text-base font-bold">
                                    {petData.pet_category}
                                </td>

                                <td className="px-6 py-4 ">
                                    <div className='flex flex-col items-center gap-1'>
                                        <div className='w-10 h-10 overflow-hidden'>
                                            <img className='object-cover rounded-full' src={petData.user_image} alt="" />
                                        </div>
                                        <p className='nunito text-xl font-bold text-center'>{petData.added_by}</p>
                                        <p className='nunito text-xs text-center'>{petData.currentUserEmail}</p>
                                    </div>
                                </td>

                                <td className="px-6 py-4 ">
                                    {petData.pet_location}
                                </td>

                                <td>
                                    <div className='flex items-center justify-around'>
                                        <button onClick={() => handleUpdatePet(petData)} className="hover:text-cyan-400">
                                            <FaRegEdit size={25} />
                                        </button>

                                        <button onClick={() => handleDelete(petData._id)} className="text-red-500 hover:text-red-700">
                                            <MdDeleteForever size={25} />
                                        </button>

                                        <button onClick={() => handleChangeStatus(petData._id, petData.adopted, petData.isRequested)}>
                                            {
                                                petData.adopted === false ? <FaHeart className="text-cyan-50 hover:text-green-200" size={25} /> : <FaHeartCircleCheck size={25} className="text-green-400" />
                                            }
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {data?.pets?.length === 0 && (
                <div className="h-[50vh] flex flex-col gap-3 items-center">
                    <h1 className="text-center font-bold text-xl md:text-2xl mt-10 poppins uppercase text-black/80 dark:text-white/80">
                        nothing to show
                    </h1>
                    <button onClick={() => navigate('/dashboard/create-donation-campaign')} className='bg-cyan-500 dark:bg-cyan-900 py-2 px-4 rounded nunito text-cyan-50 hover:bg-cyan-600 dark:hover:bg-cyan-950'>
                        Add A Pet
                    </button>
                </div>
            )}
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
            {
                selectedPets && <UpdatePetModal selectedPets={selectedPets} setSelectedPets={setSelectedPets} refetch={refetch} />
            }
        </div>
    );
};

export default AllPets;
