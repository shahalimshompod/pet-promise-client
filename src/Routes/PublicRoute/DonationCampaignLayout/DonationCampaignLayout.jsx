import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CampaignCard from "../../../Components/CampaignCard/CampaignCard";
import { CircleLoader } from "react-spinners"; // Import spinner
import CampaignCardSkeleton from "../../../Components/SkeletonComponent/CardComponents/CampaignCardSkeleton";

const DonationCampaignLayout = () => {
    const axiosSecure = useAxiosSecure();
    const { ref, inView } = useInView();
    const itemsPerPage = 12;

    // Fetch function with pagination
    const fetchCampaignData = async ({ pageParam = 1 }) => {
        const res = await axiosSecure.get(`/donation-campaigns?page=${pageParam}&limit=${itemsPerPage}`);
        return res?.data;
    };

    // Infinite Query Hook
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["donation-campaign"],
        queryFn: fetchCampaignData,
        getNextPageParam: (lastPage, pages) => (lastPage.length === itemsPerPage ? pages.length + 1 : undefined),
    });

    // Fetch more data when the user reaches the bottom
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div className="py-5 lg:py-12 bg-gradient-to-br from-white via-cyan-50 to-white dark:bg-gradient-to-br dark:from-[#111827] dark:via-[#111827]/80 dark:to-[#111827] px-3 xl:px-0">
            <div className="container mx-auto">
                <div>
                    <h1 className="poppins font-semibold text-3xl md:text-4xl lg:text-5xl text-black/70 dark:text-white/70 text-center md:text-left">
                        Donation Campaigns
                    </h1>
                </div>
                <div className="flex flex-col items-center">
                    <div className="my-8 md:my-12 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 xl:gap-12">
                        {isLoading && <CampaignCardSkeleton cards={9} />}
                        {data?.pages.map((page) =>
                            page.map((campaign, idx) => <CampaignCard key={idx} data={campaign} />)
                        )}
                    </div>



                    <div ref={ref} className="h-10">
                        {/* Spinner Loader */}
                        {isFetchingNextPage && (
                            <div className="text-center my-8 flex flex-col items-center">
                                <CircleLoader color="#3498db" loading={true} size={60} />
                                <p className="mt-3 text-gray-500">Loading more campaigns...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationCampaignLayout;
