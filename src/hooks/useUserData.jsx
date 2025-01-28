import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useUserData = (email) => {
  return useQuery({
    queryKey: ["user", email], // Define a unique key for the query
    queryFn: async () => {
      if (!email) throw new Error("Email is required");
      const response = await axiosSecure.get(`/users/${email}`);
    //   console.log(response.data.user);
      return response.data.user;
    },
    enabled: !!email, // Prevent query from running if email is not provided
  });
};

export default useUserData;
