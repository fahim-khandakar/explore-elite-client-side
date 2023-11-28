import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useBookingsData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    data: bookingsData,
    isLoading: isBookingsLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookingsData", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/?email=${user?.email}`);
      return res.data;
    },
  });
  return { bookingsData, isBookingsLoading, refetch };
};

export default useBookingsData;
