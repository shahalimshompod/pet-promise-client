import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

const useUsers = (page) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const currentUserEmail = user?.email;

    const fetchUsers = async () => {
        const res = await axiosSecure.get(`/all-users?page=${page}&email=${currentUserEmail}`);
        return res?.data;
    };

    return useQuery({
        queryKey: ['users', page],
        queryFn: fetchUsers
    });
};

export default useUsers;