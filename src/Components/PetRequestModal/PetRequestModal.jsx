import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthContextProvider/AuthContextProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PetRequestModal = ({ petForAdopt, setPetForAdopt, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const name = user.displayName;
    const email = user.email;
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const pet_image = petForAdopt.pet_image;
        const pet_id = petForAdopt._id;
        const pet_name = petForAdopt.pet_name;
        const pet_age = petForAdopt.pet_age;
        const pet_category = petForAdopt.pet_category;
        const owner_email = petForAdopt.currentUserEmail;
        const requestorName = data.userName;
        const requestorEmail = data.email;
        const requestorImage = user.photoURL;
        const requestorContactNumber = data.phone;
        const requestorAddress = data.address;


        const finalData = {
            pet_image,
            pet_id,
            pet_name,
            pet_age,
            pet_category,
            owner_email,
            requestorName,
            requestorAddress,
            requestorEmail,
            requestorImage,
            requestorContactNumber
        }

        if (!finalData) {
            return console.error('Error requesting pet')
        }



        // changing the status of isRequested in petsCollection
        const response = await axiosSecure.post(`/requested-pets/${pet_id}`, finalData)


        if (response.data.message) {
            const message = response.data.message;
            Swal.fire("Warning!", `${message}!`, "warning");
        }

        if (response.data.insertedId) {

            const updatedData = {
                isRequested: true,
            }

            const responseForStatusChange = await axiosSecure.patch(`/change-status-to-requested/${petForAdopt._id}`, updatedData)

            if (responseForStatusChange.data.updated) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Adoption request sent!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/pet-listing')

                // Close the modal after submission
                setPetForAdopt(null);
                refetch();

            }
        }

    };

    if (!petForAdopt) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[1200]">
            <div className="bg-cyan-100 dark:bg-gray-800 rounded-lg shadow-lg w-full h-full  lg:h-[600px] 2xl:h-[800px] overflow-y-scroll lg:w-1/2 p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-lg font-bold text-gray-800">{petForAdopt.pet_name}</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => setPetForAdopt(null)}
                    >
                        &times;
                    </button>
                </div>

                {/* Pet Information */}
                <div className="mb-4">
                    <h1 className="nunito mb-2 dark:text-white text-black/80 ">Pet ID: {petForAdopt._id}</h1>
                    <img
                        src={petForAdopt.pet_image}
                        alt={petForAdopt.pet_name}
                        className="w-full h-48 object-cover rounded-md mb-3"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <h1 className="poppins  font-semibold  text-2xl dark:text-white text-black/80">User Info</h1>
                    {/* User Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium  dark:text-white text-black/80">
                            User Name
                        </label>
                        <input
                            disabled
                            defaultValue={name}
                            type="text"
                            {...register("userName", { required: "User name is required" })}
                            className={`w-full p-2 border bg-white dark:bg-black/50 text-black dark:text-white  ${errors.userName ? "border-red-500" : "border-gray-300"} rounded mt-1`}
                        />
                        {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium dark:text-white text-black/80">
                            Email
                        </label>
                        <input
                            disabled
                            defaultValue={email}
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className={`w-full p-2 border bg-white dark:bg-black/50 text-black dark:text-white  ${errors.email ? "border-red-500" : "border-gray-300"} rounded mt-1`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium dark:text-white text-black/80">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            {...register("phone", {
                                required: "Phone number is required",
                                minLength: {
                                    value: 11,
                                    message: "Phone number must be exactly 11 digits",
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Phone number must be exactly 11 digits",
                                },
                            })}
                            placeholder="Enter your phone number"
                            className={`w-full p-2 border bg-white dark:bg-black/50 text-black dark:text-white  ${errors.phone ? "border-red-500" : "border-gray-300"} rounded mt-1`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium dark:text-white text-black/80">
                            Address
                        </label>
                        <textarea
                            {...register("address", { required: "Address is required" })}
                            placeholder="Enter your address"
                            className={`w-full p-2 border bg-white dark:bg-black/50 text-black dark:text-white  ${errors.address ? "border-red-500" : "border-gray-300"} rounded mt-1`}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Send Adoption Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PetRequestModal;
