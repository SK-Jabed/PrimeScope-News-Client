import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const usePublishers = () => {
  const fetchPublishers = async () => {
    const { data } = await axiosSecure.get("/publishers");
    return data;
  };

  const {
    data: publishers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: fetchPublishers,
  });

  return { publishers, isLoading, isError, refetch };
};

export default usePublishers;
