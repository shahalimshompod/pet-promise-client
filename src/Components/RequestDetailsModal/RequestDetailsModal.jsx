import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { SpinnerCircular } from "spinners-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestDetailsModal = ({ selectedPets, setSelectedPets, refetch }) => {
    const axiosSecure = useAxiosSecure();
    // loading states
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [RejectLoading, setRejectLoading] = useState(false);

    // handle accept request
    const handleAcceptRequest = async (petId, id) => {
        setAcceptLoading(true)

        const updateRequestedStatus = {
            isRequested: false
        }

        // updating the status of isRequested
        const response = await axiosSecure.patch(`/accept-request-change-reqStatus/${id}`, updateRequestedStatus)
        
        if (response.data.updated) {

            const updatedAdoptedStatus = {
                adopted: true,
            }

            // updating the status of 
            const res = await axiosSecure.patch(`/accept-request-change-adoptedStatus/${petId}`, updatedAdoptedStatus)
            
            if (response.data.updated) {

                const updatedStatusForReqStatus = {
                    isRequested: false,
                }

                const responses = await axiosSecure.patch(`/accept-request-change-reqStatus-petCollection/${petId}`, updatedStatusForReqStatus)
                
                if (responses.data.updated) {

                    const updatedStatusForAdoptedStatus = {
                        adopted: true,
                    }

                    const responses = await axiosSecure.patch(`/accept-request-change-adoptedStatus-requestedPets/${id}`, updatedStatusForAdoptedStatus)
                    

                    if (responses.data.updated) {
                        Swal.fire({
                            title: "Accepted!",
                            text: "Adoption Request Accepted Successfully.",
                            icon: "success",
                        });

                        setSelectedPets(null)
                        refetch();
                        setAcceptLoading(false)
                    }

                }

            }
        }


    }

    // handle reject request
    const handleRejectRequest = (petId, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setRejectLoading(true)


                const Status = {
                    isRequested: false,
                }
                const res = await axiosSecure.patch(`/reject-request-status-change/${petId}`, Status)
                

                if (res.data.updated) {
                    const adoptionStatus = { adopted: false }
                    const res = await axiosSecure.patch(`/change-pet-status/${petId}`, adoptionStatus)
                    

                    if (res.data.updated) {
                        const res = await axiosSecure.delete(`/reject-request/${id}`)
                        

                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Rejected!",
                                text: "Adoption Request has been Rejected!",
                                icon: "success",
                            });

                            setSelectedPets(null)
                            refetch();
                            setRejectLoading(false)
                        }
                    }
                }
            }
        });


    }




    if (!selectedPets) return null;


    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-cyan-100 dark:bg-[#111827] max-w-xl rounded-xl border-2 border-cyan-500 p-6">
                <div className="flex justify-between items-center mb-4 border-b border-black dark:border-white pb-2">
                    <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-50 poppins">
                        Request For:
                    </h2>
                    <button
                        onClick={() => setSelectedPets(null)}
                        className="text-cyan-800 dark:text-cyan-50 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>


                <div className="flex gap-4">
                    <div className="w-full">
                        <img className="object-center rounded-2xl" src={selectedPets.pet_image} />
                    </div>

                    <div className="w-full">
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Pet ID:  (<span className="font-bold">{selectedPets.pet_id}</span>)</p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Pet name: <span className="font-bold">{selectedPets.pet_name}</span></p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Pet category: <span className="font-bold">{selectedPets.pet_category}</span></p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Pet age: <span className="font-bold">{selectedPets.pet_age}</span></p>
                    </div>
                </div>

                <div className="flex justify-between items-center my-4 border-b border-black dark:border-white pb-2">
                    <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-50 poppins">
                        Requestor Info:
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    <div className="overflow-hidden">
                        <img className="object-center object-cover rounded-full w-32 h-24" src={selectedPets.requestorImage} />
                    </div>

                    <div className="w-full">
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Name:  <span className="font-bold">{selectedPets.requestorName}</span></p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Email: <span className="font-bold">{selectedPets.requestorEmail}</span></p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Address: <span className="font-bold">{selectedPets.requestorAddress}</span></p>
                        <p className="nunito text-cyan-900 dark:text-cyan-50">Phone: <span className="font-bold">{selectedPets.requestorContactNumber}</span></p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div></div>

                    <div className="flex items-center justify-between gap-5">
                        <button onClick={() => handleAcceptRequest(selectedPets.pet_id, selectedPets._id)} className="bg-green-500  hover:bg-green-600 py-2 w-16 rounded text-sm nunito text-cyan-50 font-bold">
                            {
                                acceptLoading ? <div className="flex flex-col items-center"><div></div><SpinnerCircular size={20} thickness={100} speed={118} color="rgba(57, 168, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.64)" /></div> : 'Accept'
                            }
                        </button>

                        <button onClick={() => { handleRejectRequest(selectedPets.pet_id, selectedPets._id) }} className="bg-red-500  hover:bg-red-600 py-2 w-16 rounded text-sm nunito text-cyan-50 font-bold">
                            {
                                RejectLoading ? <div className="flex flex-col items-center"><div></div><SpinnerCircular size={20} thickness={100} speed={118} color="rgba(57, 168, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.64)" /></div> : 'Reject'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsModal;
