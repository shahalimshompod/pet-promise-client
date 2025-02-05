import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SpinnerCircular } from "spinners-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdatePetModal = ({ selectedPets, setSelectedPets, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // IMAGE HOSTING KEY
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // image hosting api
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


    // loading states
    const [loading, setLoading] = useState(false);

    // hook form
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


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



    const onSubmit = async (data) => {
        setLoading(true)
        const stringIsRequested = data.isRequested;
        const isRequested = stringIsRequested === 'true';

        const stringAdopted = data.adopted;
        const adopted = stringAdopted === 'true';


        const pet_name = data.name;
        const pet_age = data.age;
        const pet_location = data.location;
        const pet_short_description = data.shortDescription;
        const pet_long_description = data.longDescription;
        const pet_category = data.category.value;
        const imageFile = { image: data.image[0] };
        const pet_image = selectedPets.pet_image; //previous image


        if (imageFile && imageFile.image) {
            // Image hosting
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            const pet_image = res.data.data.display_url;

            // data for update
            const updatedData = {
                pet_name,
                pet_age,
                pet_location,
                pet_short_description,
                pet_long_description,
                pet_category,
                isRequested,
                adopted,
                pet_image, //new image
            }

            const response = await axiosSecure.put(`/update-pets/${selectedPets._id}`, updatedData)
            if (response.data.modifiedCount > 0) {
                setSelectedPets(null)
                refetch()

                Swal.fire({
                    title: "Updated!",
                    text: "Pet Updated Successfully.",
                    icon: "success",
                });
                setLoading(false)
            }


        } else {
            // data for update
            const updatedData = {
                pet_name,
                pet_age,
                pet_location,
                pet_short_description,
                pet_long_description,
                pet_category,
                isRequested,
                adopted,
                pet_image, // previous image
            }

            const res = await axiosSecure.put(`/update-pets/${selectedPets._id}`, updatedData)
            
            if (res.data.message) {
                Swal.fire({
                    title: "Saved!",
                    text: "Nothing changed.",
                    icon: "info",
                });
                setLoading(false)
                setSelectedPets(null)
                return
            }
            if (res.data.modifiedCount > 0) {
                setSelectedPets(null)
                refetch()

                Swal.fire({
                    title: "Updated!",
                    text: "Pet Updated Successfully.",
                    icon: "success",
                });
            }
        }
    }

    const categories = [
        { value: "Dog", label: "Dog" },
        { value: "Cat", label: "Cat" },
        { value: "Bird", label: "Bird" },
        { value: "Rabbit", label: "Rabbit" },
        { value: "Fish", label: "Fish" },
    ];



    if (!selectedPets) return null;


    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-cyan-100 dark:bg-[#111827] w-full h-full  lg:h-[600px] 2xl:h-[800px] 2xl:w-11/12 max-w-3xl rounded-xl border-2 border-cyan-500 p-6 overflow-scroll scrollbar-none">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-800 dark:text-cyan-50 poppins">
                        Update This Pet
                    </h2>
                    <button
                        onClick={() => setSelectedPets(null)}
                        className="text-cyan-800 dark:text-cyan-50 text-xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex flex-col items-center  overflow-hidden">
                    <p className="nunito font-bold">Previous photo</p>
                    <img className="w-1/3 object-center rounded-2xl" src={selectedPets.pet_image} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Pet Image */}
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                    >
                        Upload photo
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-cyan-200 nunito dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        {...register("image")}
                    />

                    <div className="flex items-center justify-between gap-3">
                        {/* Pet Name */}
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                                Pet Name
                            </label>
                            <input
                                defaultValue={selectedPets.pet_name}
                                type="text"
                                {...register("name", { required: "Pet name is required" })}
                                className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                            />
                            {errors.name && (
                                <p className="text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Pet Age */}
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                                Pet Age
                            </label>
                            <input
                                defaultValue={selectedPets.pet_age}
                                type="number"
                                {...register("age", { required: "Pet age is required" })}
                                className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                            />
                            {errors.age && (
                                <p className="text-red-500">{errors.age.message}</p>
                            )}
                        </div>
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
                            defaultValue={
                                categories.find((category) => category.value === selectedPets.pet_category) // Match based on value
                            }
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={categories}
                                    placeholder="Select a category"
                                    isSearchable={false}
                                    styles={customStyles}
                                />
                            )}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        {/* Pet Location */}
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                                Pet Location
                            </label>
                            <input
                                defaultValue={selectedPets.pet_location}
                                type="text"
                                {...register("location")}
                                className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                            />
                        </div>

                        {/* Short Description */}
                        <div className="w-full">
                            <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                                Short Description
                            </label>
                            <input
                                defaultValue={selectedPets.pet_short_description}
                                type="text"
                                {...register("shortDescription", {
                                    required: "Short description is required",
                                })}
                                className="block w-full border border-cyan-800 rounded-md p-2 bg-cyan-200 dark:bg-[#374151]/20 nunito text-cyan-800 dark:text-cyan-50"
                            />
                        </div>
                    </div>

                    {/* pet status */}
                    <div className="flex items-center gap-3">
                        <div className="w-full">
                            <label for="countries" className="block mb-2 nunito text-cyan-800 font-medium  dark:text-white ">Request Status</label>
                            <select
                                defaultValue={selectedPets.isRequested}
                                {...register("isRequested")}
                                id="countries" className="bg-cyan-200 border border-cyan-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 nunito text-cyan-800">
                                <option selected>Choose One</option>
                                <option value="true">Requested</option>
                                <option value="false">Not Requested</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label for="countries" className="block mb-2 nunito text-cyan-800 font-medium  dark:text-white ">Adoption Status</label>
                            <select
                                defaultValue={selectedPets.adopted}
                                {...register("adopted")}
                                id="countries" className="bg-cyan-200 border border-cyan-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 nunito text-cyan-800">
                                <option selected>Choose one</option>
                                <option value={true}>Adopted</option>
                                <option value={false} >Not Adopted</option>
                            </select>
                        </div>
                    </div>

                    {/* Long Description */}
                    <div>
                        <label className="block mb-2 font-medium text-cyan-800 dark:text-cyan-50 nunito">
                            Long Description
                        </label>
                        <div className="dark:bg-[#374151]/20 bg-cyan-200 dark:text-cyan-50">
                            <Controller
                                defaultValue={selectedPets.pet_long_description}
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
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-700 nunito text-center"
                        >
                            {loading ? (
                                <div className="flex flex-col items-center"><div></div><SpinnerCircular size={20} thickness={100} speed={118} color="rgba(57, 168, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.64)" /></div>
                            ) : (
                                "Update Pet"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePetModal;
