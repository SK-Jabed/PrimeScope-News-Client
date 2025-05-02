import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useUserData = (email) => {
  return useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      if (!email) throw new Error("Email is required");
      const response = await axiosSecure.get(`/users/${email}`);
      return response.data.user;
    },
    enabled: !!email,
  });
};

export default useUserData;
