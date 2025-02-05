import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CampaignUpdateModal = ({ selectedCampaign, setSelectedCampaign, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    // Image Hosting Key and API
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();


    useEffect(() => {
        if (selectedCampaign) {
            reset({
                petName: selectedCampaign.petName,
                campaignTitle: selectedCampaign.campaignTitle,
                maxDonation: selectedCampaign.maxDonation,
                lastDate: new Date(selectedCampaign.lastDate).toISOString().slice(0, 16), // Convert to datetime-local format
                shortDescription: selectedCampaign.shortDescription,
                longDescription: selectedCampaign.longDescription,
            });
        }
    }, [selectedCampaign, reset]);

    const onSubmit = async (data) => {
        setLoading(true);

        const { campaignTitle, petName, maxDonation, longDescription, shortDescription, lastDate } = data;
        const imageFile = data.petPicture?.[0];
        const petPicture = selectedCampaign.petPicture; // Current image

        try {
            let updatedPetPicture = petPicture;

            if (imageFile) {
                // Upload new image to hosting API
                const formData = new FormData();
                formData.append("image", imageFile);

                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: { "content-type": "multipart/form-data" },
                });

                updatedPetPicture = res.data.data.display_url;
            }

            const updatedData = {
                campaignTitle,
                petName,
                maxDonation,
                longDescription,
                shortDescription,
                lastDate,
                petPicture: updatedPetPicture,
            };

            const response = await axiosSecure.put(`/update-campaign/${selectedCampaign._id}`, updatedData);

            

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Campaign Updated Successfully.",
                    icon: "success",
                });
                setSelectedCampaign(null);
                refetch();
            } else {
                Swal.fire({
                    title: "Saved!",
                    text: "Nothing changed.",
                    icon: "info",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!selectedCampaign) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1050]">
            <div className="dark:bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-lg h-full lg:max-h-[500px] 2xl:max-h-[700px] overflow-y-scroll scrollbar-none bg-cyan-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-left text-cyan-800 dark:text-cyan-50 poppins">
                        Update Campaign
                    </h2>
                    <button
                        onClick={() => setSelectedCampaign(null)}
                        className="text-cyan-800 dark:text-cyan-50 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Pet Picture */}
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                                Pet Picture
                            </label>
                            <input
                                type="file"
                                {...register("petPicture")}
                                className="block w-full text-sm text-gray-900 dark:text-white/80 border border-gray-300 rounded-lg bg-cyan-200 cursor-pointer dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <p className="nunito mb-1 font-semibold text-black dark:text-cyan-50">Current Image</p>
                            <img className="w-48" src={selectedCampaign.petPicture} alt="Current Pet" />
                        </div>
                    </div>

                    {/* Pet Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Pet Name
                        </label>
                        <input
                            type="text"
                            {...register("petName", { required: "Pet name is required" })}
                            className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white nunito"
                        />
                        {errors.petName && <p className="text-red-500 mt-1">{errors.petName.message}</p>}
                    </div>

                    {/* Campaign Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Campaign Title
                        </label>
                        <input
                            type="text"
                            {...register("campaignTitle", { required: "Campaign title is required" })}
                            className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white nunito"
                        />
                        {errors.campaignTitle && (
                            <p className="text-red-500 mt-1">{errors.campaignTitle.message}</p>
                        )}
                    </div>

                    {/* Maximum Donation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Maximum Donation Amount
                        </label>
                        <input
                            type="number"
                            {...register("maxDonation", {
                                required: "Maximum donation amount is required",
                                min: { value: 1, message: "Amount must be greater than 0" },
                            })}
                            className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white nunito"
                        />
                        {errors.maxDonation && (
                            <p className="text-red-500 mt-1">{errors.maxDonation.message}</p>
                        )}
                    </div>

                    {/* Last Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Last Date of Donation
                        </label>
                        <input
                            type="datetime-local"
                            {...register("lastDate", {
                                required: "Last date is required",
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const currentDate = new Date();
                                    currentDate.setHours(0, 0, 0, 0);

                                    return (
                                        selectedDate >= currentDate || "Date cannot be earlier than today"
                                    );
                                },
                            })}
                            className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white nunito"
                        />
                        {errors.lastDate && <p className="text-red-500 mt-1">{errors.lastDate.message}</p>}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Short Description
                        </label>
                        <input
                            type="text"
                            {...register("shortDescription", {
                                required: "Short description is required",
                            })}
                            className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-gray-700 text-gray-900 dark:text-white nunito"
                        />
                        {errors.shortDescription && (
                            <p className="text-red-500 mt-1">{errors.shortDescription.message}</p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2 nunito">
                            Long Description
                        </label>
                        <div className="dark:bg-gray-500 bg-cyan-200 rounded-lg text-black dark:text-white">
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

                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setSelectedCampaign(null)}
                            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-white rounded-md ${loading ? "bg-cyan-400" : "bg-cyan-500 hover:bg-cyan-700"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Campaign"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CampaignUpdateModal;
