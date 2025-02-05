import { useState } from "react";
import PetCard from "../../../Components/Cards/PetCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAvailablePets from "../../../hooks/useAvailablePets";
import CardPetSkeleton from "../../../Components/SkeletonComponent/CardComponents/CardPetSkeleton";
import { CircleLoader } from "react-spinners";

const PetListingLayout = () => {
    // States for filters
    const [searchQuery, setSearchQuery] = useState("");
    const [sortByCategory, setSortByCategory] = useState("");

    // Use the custom hook
    const { pets, isLoading, loaderRef, hasNextPage } = useAvailablePets(sortByCategory, searchQuery);

    return (
        <div className="py-5 lg:py-12 bg-gradient-to-br from-white via-cyan-50 to-white dark:bg-gradient-to-br dark:from-[#111827] dark:via-[#111827]/80 dark:to-[#111827] px-3 xl:px-0 transition duration-300">
            <div className="container mx-auto">
                <div className="px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Heading */}
                    <h1 className="poppins font-semibold text-3xl md:text-4xl lg:text-5xl text-black/70 dark:text-white/70 text-center md:text-left">
                        Available Pets
                    </h1>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        {/* Select Option */}
                        <div className="w-full sm:w-auto">
                            <form className="max-w-sm mx-auto">
                                <select
                                    onChange={(e) => setSortByCategory(e.target.value)}
                                    id="categories"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option className="nunito font-light" value="" selected>
                                        All
                                    </option>
                                    <option className="nunito font-light" value="Dog">
                                        Dog
                                    </option>
                                    <option className="nunito font-light" value="Cat">
                                        Cat
                                    </option>
                                    <option className="nunito font-light" value="Rabbit">
                                        Rabbit
                                    </option>
                                    <option className="nunito font-light" value="Bird">
                                        Bird
                                    </option>
                                    <option className="nunito font-light" value="Fish">
                                        Fish
                                    </option>
                                </select>
                            </form>
                        </div>

                        {/* Search Option */}
                        <div className="w-full sm:w-auto">
                            <form className="w-full mx-auto">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search pets with name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* cards */}

                <>
                    <div className="flex flex-col items-center">
                        <div className="my-8 md:my-12 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-12">
                            {isLoading && <CardPetSkeleton cards={9} />}
                            {pets?.map((pet, index) => (
                                <PetCard key={index} petData={pet}></PetCard>
                            ))}
                        </div>
                    </div>

                    <div ref={loaderRef} className="text-center my-4 text-black dark:text-white">
                        {hasNextPage ? (
                            <div className="text-center my-8 flex flex-col items-center">
                                <CircleLoader color="#3498db" loading={true} size={60} />
                                <p className="mt-3 text-gray-500">More pets loading..</p>
                            </div>
                        ) : 'No more pets available'}
                    </div>
                </>
            </div>
        </div>
    );
};

export default PetListingLayout;
