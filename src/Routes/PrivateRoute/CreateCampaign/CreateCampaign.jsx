import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import { SpinnerCircular } from "spinners-react";

const CreateCampaign = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    // current user email
    const currentUserEmail = user?.email;
    const currentUserName = user?.displayName;


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    // Your Cloudinary/ImgBB API key
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

    // create campaign
    const onSubmit = async (data) => {
        setLoading(true);
        console.table(data);
        const { petPicture, maxDonation, lastDate, shortDescription, longDescription, petName, campaignTitle } = data;

        // Upload pet picture
        const imageFile = { image: petPicture[0] };
        try {
            const imageResponse = await axios.post(imageHostingAPI, imageFile, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const petPictureUrl = imageResponse?.data?.data?.display_url;
            

            const campaignAddedDate = new Date();
            const isPaused = false;

            if (petPictureUrl) {
                const campaignData = {
                    petPicture: petPictureUrl,
                    maxDonation: parseInt(maxDonation),
                    // lastDate: new Date(lastDate),
                    lastDate,
                    shortDescription,
                    longDescription,
                    campaignAddedDate,
                    currentUserEmail,
                    currentUserName,
                    petName,
                    donatedAmount: 0,
                    isPaused,
                    campaignTitle,
                };

                const res = await axiosSecure.post('/post-campaign', campaignData)
                

                if (res.data.insertedId) {
                    // Show success message
                    Swal.fire({
                        icon: "success",
                        title: "Campaign Created Successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    // Reset the form
                    reset();
                }
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Swal.fire({
                icon: "error",
                title: "Image Upload Failed!",
                text: "Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cyan-100 dark:bg-gray-800 w-full mx-auto rounded-lg border border-cyan-500 p-6 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-cyan-800 dark:text-cyan-50">
                Create a Donation Campaign
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Pet Picture */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Pet Picture
                    </label>
                    <input
                        type="file"
                        {...register("petPicture", { required: "Pet picture is required" })}
                        className="block w-full text-sm text-gray-900 dark:text-white/80 border border-gray-300 rounded-lg bg-cyan-200 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    />
                    {errors.petPicture && (
                        <p className="text-red-500 mt-1">{errors.petPicture.message}</p>
                    )}
                </div>

                {/* Pet name */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Pet Name
                    </label>
                    <input
                        type="text"
                        {...register("petName", {
                            required: "Pet name is required",
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.petName && (
                        <p className="text-red-500 mt-1">{errors.petName.message}</p>
                    )}
                </div>

                {/* Campaign title */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Campaign Title
                    </label>
                    <input
                        type="text"
                        {...register("campaignTitle", {
                            required: "Pet name is required",
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.campaignTitle && (
                        <p className="text-red-500 mt-1">{errors.campaignTitle.message}</p>
                    )}
                </div>

                {/* Maximum Donation Amount */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Maximum Donation Amount
                    </label>
                    <input
                        type="number"
                        {...register("maxDonation", {
                            required: "Maximum donation amount is required",
                            min: { value: 1, message: "Amount must be greater than 0" },
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.maxDonation && (
                        <p className="text-red-500 mt-1">{errors.maxDonation.message}</p>
                    )}
                </div>

                {/* Last Date of Donation */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Last Date and Time of Donation
                    </label>
                    <input
                        type="datetime-local"
                        {...register("lastDate", {
                            required: "Last date and time is required",
                            validate: (value) => {
                                const selectedDate = new Date(value);
                                const currentDate = new Date();
                                currentDate.setSeconds(0, 0);  // Reset seconds and milliseconds for comparison

                                return (
                                    selectedDate >= currentDate || "Date and time cannot be earlier than current date and time"
                                );
                            },
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.lastDate && (
                        <p className="text-red-500 mt-1">{errors.lastDate.message}</p>
                    )}
                </div>



                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Short Description
                    </label>
                    <input
                        type="text"
                        {...register("shortDescription", {
                            required: "Short description is required",
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 mt-1">{errors.shortDescription.message}</p>
                    )}
                </div>

                {/* Long Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Long Description
                    </label>
                    <div className="dark:bg-gray-400 bg-cyan-200 rounded-lg text-black dark:text-white">
                        <Controller
                            name="longDescription"
                            control={control}
                            rules={{ required: "Long description is required" }}
                            render={({ field }) => (
                                <ReactQuill
                                    theme="snow"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    {errors.longDescription && (
                        <p className="text-red-500 mt-1">{errors.longDescription.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded-md ${loading ? "bg-cyan-400" : "bg-cyan-500 hover:bg-cyan-700"
                        }`}
                    disabled={loading}
                >
                    {loading ? <div className="flex flex-col items-center"><SpinnerCircular size={23} thickness={180} speed={100} color="rgba(57, 163, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" /></div> : "Create Campaign"}
                </button>
            </form>
        </div>
    );
};

export default CreateCampaign;
