import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRequestorAmount = (petId) => {
    const axiosSecure = useAxiosSecure();

    // query function
    const fetchRequestorAmount = async () => {
        const res = await axiosSecure.get(`/requestor-amount?id=${petId}`)


        return res?.data;
    }
    return useQuery({
        queryKey: ['requestor-amount'],
        queryFn: fetchRequestorAmount,
    });
};

export default useRequestorAmount;