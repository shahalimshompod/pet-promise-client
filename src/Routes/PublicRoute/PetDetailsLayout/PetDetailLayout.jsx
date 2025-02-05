import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import PetRequestModal from '../../../Components/PetRequestModal/PetRequestModal';
import { AuthContext } from '../../../AuthContextProvider/AuthContextProvider';
import LoginModal from '../../../Components/LoginModal/LoginModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const PetDetailLayout = () => {

    const axiosPublic = useAxiosPublic();
    const params = useParams();
    const id = params.id;
    const { user, signInWithGoogle, setUser, signInWithFacebook } = useContext(AuthContext)

    // states for modal
    const [petForAdopt, setPetForAdopt] = useState(null)

    useEffect(() => {
        if (petForAdopt) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [petForAdopt]);

    // query functions
    const fetchPets = async () => {
        const response = await axiosPublic.get(`/pet-details/${id}`);
        return response?.data;
    }

    // fetching pets data
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['pet-details', id],
        queryFn: fetchPets,
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

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
            <div className="w-full mx-auto bg-gradient-to-br from-cyan-100 via-cyan-50 to-cyan-100 dark:bg-gradient-to-br dark:from-[#111827]/90 dark:via-[#111827]/70 dark:to-[#111827]/90 shadow-lg overflow-hidden">
                <div className="container mx-auto xl:py-6 p-3 xl:p-0">
                    <div className="flex gap-3 mb-6">
                        <Skeleton circle={true} height={80} width={80} className="dark:bg-[#2D3748] bg-cyan-50" />
                        <div>
                            <Skeleton height={30} width={200} className="dark:bg-[#2D3748] bg-cyan-50" />
                            <Skeleton height={20} width={150} className="dark:bg-[#2D3748] bg-cyan-50" />
                        </div>
                    </div>
                    {/* Image Section */}
                    <Skeleton height={800} width="100%" className="dark:bg-[#2D3748] bg-cyan-50" />

                    {/* Details Section */}
                    <div className="py-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Skeleton height={30} width={150} className="dark:bg-[#2D3748] bg-cyan-50" />
                                <Skeleton height={20} width={120} className="dark:bg-[#2D3748] bg-cyan-50" />
                            </div>
                            <Skeleton height={40} width={120} className="dark:bg-[#2D3748] bg-cyan-50" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-black dark:text-white">
                            <div>
                                <Skeleton height={20} width={100} className="dark:bg-[#2D3748] bg-cyan-50" />
                                <Skeleton height={20} width={100} className="dark:bg-[#2D3748] bg-cyan-50" />
                                <Skeleton height={20} width={100} className="dark:bg-[#2D3748] bg-cyan-50" />
                            </div>
                        </div>

                        {/* Short Description */}
                        <Skeleton height={20} width={200} className="dark:bg-[#2D3748] bg-cyan-50" />
                        <Skeleton height={40} width="80%" className="dark:bg-[#2D3748] bg-cyan-50" />

                        {/* Long Description */}
                        <Skeleton height={20} width={200} className="dark:bg-[#2D3748] bg-cyan-50" />
                        <Skeleton height={40} width="80%" className="dark:bg-[#2D3748] bg-cyan-50" />
                    </div>
                </div>
            </div>

        );
    }

    return (
        <div>
            <div className="w-full  mx-auto bg-gradient-to-br from-cyan-100 via-cyan-50 to-cyan-100 dark:bg-gradient-to-br dark:from-[#111827]/90 dark:via-[#111827]/70 dark:to-[#111827]/90 shadow-lg overflow-hidden">
                <div className="container mx-auto xl:py-6 p-3 xl:p-0 ">
                    <div className='flex items-center lg:items-start gap-3 mb-6'>
                        <img className='lg:w-20 w-10 h-10 lg:h-20  rounded' src={data.user_image} alt="User image" />
                        <div>
                            <h1 className='poppins font-semibold text-xl dark:text-white/80 text-cyan-800'>{data.added_by}</h1>
                            <p className='nunito text-cyan-800 dark:text-cyan-50'> Added: {''}
                                {formatDate(data.createdAt).date} |{' '}
                                {formatDate(data.createdAt).time}
                            </p>
                        </div>
                    </div>
                    {/* Image Section */}
                    <img
                        src={data.pet_image}
                        alt={data.pet_name}
                        className="w-full lg:h-[800px] object-cover object-center"
                    />

                    {/* Details Section */}
                    <div className="py-6">

                        <div className='flex items-center justify-between mb-4'>
                            <div>
                                <h1 className="text-2xl font-bold text-cyan-500 dark:text-cyan-400 poppins mb-1">{data.pet_name}</h1>

                                <p className={`md:hidden text-center  px-3 py-1 rounded-full text-sm nunito font-semibold  ${data.isRequested
                                    ? 'bg-blue-100 text-blue-700'
                                    : data.adopted === false
                                        ? 'bg-green-100 text-green-700'
                                        : ''
                                    }`}><span className='font-semibold'>{data.isRequested ? "Requested" : data.adopted ? 'Adopted' : 'Available'}</span>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className='flex items-center gap-3'>
                                <p className={`hidden md:block  px-3 py-1 rounded-full text-sm nunito font-semibold  ${data.isRequested
                                    ? 'bg-blue-100 text-blue-700'
                                    : data.adopted === false
                                        ? 'bg-green-100 text-green-700'
                                        : ''
                                    }`}><span className='font-semibold'>{data.isRequested ? "Requested" : data.adopted ? 'Adopted' : 'Available'}</span>
                                </p>
                                {
                                    user?.email === data?.currentUserEmail ? '' : <button onClick={() => setPetForAdopt(data)} className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow-md transition duration-300 nunito">Adopt</button>
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-black dark:text-white">
                            <div>
                                <p className="text-lg poppins">
                                    <span className="font-normal">Age:</span> <span className='font-bold'>{data.pet_age}</span>
                                </p>
                                <p className="text-lg poppins">
                                    <span className="font-normal">Category:</span> <span className='font-bold'>{data.pet_category}</span>
                                </p>
                                <p className="text-lg poppins">
                                    <span className="font-normal">Location:</span> <span className='font-bold'>{data.pet_location}</span>
                                </p>
                            </div>
                        </div>

                        {/* Short Description */}
                        <p className='poppins font-bold text-lg text-black dark:text-white'>Short Description:</p>
                        <p className="text-gray-700 dark:text-white/80 mb-4 roboto text-sm md:text-base lg:text-lg">{data.pet_short_description}</p>

                        {/* Long Description */}
                        <p className='poppins font-bold text-lg text-black dark:text-white'>Long Description:</p>
                        <div className="text-gray-700 dark:text-white/80 mb-6 roboto text-sm md:text-base lg:text-lg">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.pet_long_description) }} />
                        </div>
                    </div>
                </div>
            </div>
            {
                user ? petForAdopt && <PetRequestModal petForAdopt={petForAdopt} setPetForAdopt={setPetForAdopt} refetch={refetch}></PetRequestModal> : (<LoginModal signInWithGoogle={signInWithGoogle} setUser={setUser} signInWithFacebook={signInWithFacebook} petForAdopt={petForAdopt} setPetForAdopt={setPetForAdopt}></LoginModal>)
            }
        </div>
    );
};

export default PetDetailLayout;
