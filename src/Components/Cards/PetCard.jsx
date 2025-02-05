import React from 'react';
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

const PetCard = ({ petData }) => {
    return (
        <div>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-300">

                {/* pet image */}
                <div className='relative h-56 overflow-hidden'>
                    <img className=" rounded-t-lg object-cover" src={petData.pet_image} alt="product image" />
                    {/* added time */}
                    <p className='absolute top-3 left-3 bg-cyan-50 dark:bg-black/50 py-1 dark:text-cyan-50 px-3 rounded-md nunito text-xs'>{formatDistanceToNow(petData.createdAt, { addSuffix: true })}</p>
                </div>

                <div className="px-5 pb-5">
                    {/* pet name & status */}
                    <div className='flex items-center justify-between my-2'>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white poppins">{petData.pet_name}</h5>
                        <p className={`px-3 py-1 rounded-full text-sm nunito font-semibold  ${petData.isRequested
                            ? 'bg-blue-100 text-blue-700'
                            : petData.adopted === false
                                ? 'bg-green-100 text-green-700'
                                : ''
                            }`}><span className='font-semibold'>{petData.isRequested ? "Requested" : petData.adopted ? 'Adopted' : 'Available'}</span></p>
                    </div>

                    {/* pet age */}
                    <p className='roboto mb-2 text-black dark:text-white'>Age: <span className='font-semibold'>{petData.pet_age}</span></p>
                    <p className='roboto text-black dark:text-white'>Category: <span className='font-semibold'>{petData.pet_category}</span></p>

                    {/* <p className='roboto text-black dark:text-white mt-2'>Requested: <span className='font-semibold'>{data}</span></p> */}

                    {/* pet location and button */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 md:gap-0">
                        {/* location */}
                        <p className='roboto text-black dark:text-white md:w-7/12'>Location: <span className='font-semibold'>{petData.pet_location}</span></p>

                        {/* view details button */}
                        <Link to={`/pet-details/${petData._id}`} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600  hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 nunito">Pet Details</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PetCard;