import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const TouristWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: wishesData = [], isLoading } = useQuery({
    queryKey: ["wishesData", user],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishes/?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading && !user) {
    return;
  }
  console.log(wishesData);

  return <div>Tourist Wishlist</div>;
};

export default TouristWishlist;
