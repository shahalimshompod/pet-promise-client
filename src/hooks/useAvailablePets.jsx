import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxiosPublic from "./useAxiosPublic";

const useAvailablePets = (sortByCategory, searchQuery) => {
    const axiosPublic = useAxiosPublic();

    // Query function to fetch pets
    const fetchPets = async ({ queryKey, pageParam = 1 }) => {
        const [_key, { sortByCategory, searchQuery }] = queryKey;

        const response = await axiosPublic.get('/pet-listing', {
            params: { sortByCategory, searchQuery, page: pageParam, limit: 10 },
        });

        return response.data;
    };

    // Infinite Query for pet listing
    const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ["pets", { sortByCategory, searchQuery }],
        queryFn: fetchPets,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.hasMore ? pages.length + 1 : undefined;
        },
    });

    // Intersection observer for auto-fetching next page
    const { ref: loaderRef, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage]);

    // Flatten the paginated data
    const pets = data?.pages.flatMap((page) => page.pets) || [];

    return {
        pets,
        isLoading,
        isError,
        loaderRef,
        hasNextPage,
        refetch,
    };
};

export default useAvailablePets;
