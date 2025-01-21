import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useArticlesAdmin = () => {
  const { data, refetch } = useQuery({
    queryKey: ["adminArticles"], // Query key
    queryFn: async () => {
      const response = await axiosSecure.get("/articles/admin");
      return response.data;
    },
  });

  return {
    articles: data?.articles || [], // Ensure default fallback values
    total: data?.total || 0,
    refetch,
  };
};

export default useArticlesAdmin;
