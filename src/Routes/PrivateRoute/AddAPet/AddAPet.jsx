import { useForm, Controller } from "react-hook-form";
import Select from "react-select"; // Dropdown component
import Swal from "sweetalert2";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailablePets from "../../../hooks/useAvailablePets";
import { AuthContext } from "../../../AuthContextProvider/AuthContextProvider";
import useRole from "../../../hooks/useRole";
import { SpinnerCircular } from "spinners-react";


// categories for dropdown menu
const categories = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Bird", label: "Bird" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Fish", label: "Fish" },
];


// styles for rich text editor
const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#374151/20", // Dark gray background
        borderColor: "#06B6D4", // Cyan border
        color: "#ffffff", // White text
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#1e293b", // Dropdown menu background
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#0ea5e9" : "#1e293b", // Highlight focused option
        color: "#ffffff", // White text
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#000", // White text for selected value
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#94a3b8", // Light gray placeholder text
    }),
};

const AddAPet = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { refetch } = useAvailablePets();
    const { user } = useContext(AuthContext);
    const { data: role } = useRole();



    // loading state
    const [loading, setLoading] = useState(false);


    // IMAGE HOSTING KEY
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // image hosting api
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    // react hook form func
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const handleReset = () => {
        reset({
            category: null, // Reset to default value
        });
    };

    // handle add pet data
    const onSubmit = async (data) => {
        setLoading(true)
        const pet_name = data.name;
        const pet_age = data.age;
        const pet_location = data.location;
        const pet_short_description = data.shortDescription;
        const pet_long_description = data.longDescription;
        const pet_category = data.category.value;
        const imageFile = { image: data.image[0] };
        const currentUserEmail = user.email;
        const added_by = user.displayName;
        const user_image = user.photoURL;

        // Image hosting
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        const pet_image = res?.data?.data?.display_url;

        if (pet_image) {
            const dataToSend = {
                pet_name,
                pet_age,
                pet_category,
                pet_location,
                pet_short_description,
                pet_long_description,
                pet_image,
                currentUserEmail,
                role,
                added_by,
                user_image,
            };

            // POST pet data to database
            const response = await axiosSecure.post("/add-a-pet", dataToSend);

            if (response.data.insertedId) {
                // Refetch pet listing
                refetch()
                setLoading(false)
                // alert
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Pet info added!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                // resetting form data
                reset();
                // resetting category
                handleReset();

            }
        }
    };


    return (
        <div className="bg-cyan-100 dark:bg-[#111827] w-full rounded-xl border-2 border-cyan-500 p-6">
            <h2 className="text-2xl font-bold mb-4 text-cyan-800 dark:text-cyan-50 poppins">
                Add Your Pet
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Pet Image */}
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                >
                    Upload pet image
                </label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-cyan-200 nunito dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    {...register("image", { required: "Pet image is required" })}
                />
                {errors.image && (
                    <p className="text-red-500 mt-2">{errors.image.message}</p>
                )}

                {/* Pet Name */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Pet Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Pet name is required" })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* Pet Age */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Pet Age
                    </label>
                    <input
                        type="number"
                        {...register("age", { required: "Pet age is required" })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                    />
                    {errors.age && (
                        <p className="text-red-500">{errors.age.message}</p>
                    )}
                </div>

                {/* Pet Category */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Pet Category
                    </label>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Pet category is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                placeholder="Select a category"
                                isSearchable={false} // Disable typing
                                styles={customStyles}
                            />
                        )}
                    />
                    {errors.category && (
                        <p className="text-red-500">{errors.category.message}</p>
                    )}
                </div>

                {/* Pet Location */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Pet Location
                    </label>
                    <input
                        type="text"
                        {...register("location", {
                            required: "Pet location is required",
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                    />
                    {errors.location && (
                        <p className="text-red-500">{errors.location.message}</p>
                    )}
                </div>

                {/* Short Description */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Short Description
                    </label>
                    <input
                        type="text"
                        {...register("shortDescription", {
                            required: "Short description is required",
                        })}
                        className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500">
                            {errors.shortDescription.message}
                        </p>
                    )}
                </div>

                {/* Long Description */}
                <div>
                    <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                        Long Description
                    </label>
                    <div className="dark:bg-[#374151]/20 bg-cyan-200 dark:text-cyan-50">
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
                        <p className="text-red-500">
                            {errors.longDescription.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-28 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-700 nunito text-center"
                >
                    {
                        loading ? (
                            <div className="flex flex-col items-center justify-center">
                                <SpinnerCircular size={20} thickness={100} speed={100} color="rgba(57, 132, 172, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
                            </div>
                        ) : 'Add pet'
                    }
                </button>
            </form>
        </div>
    );
};

export default AddAPet;
