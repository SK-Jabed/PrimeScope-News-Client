// import { useQuery } from "@tanstack/react-query";
// import { axiosSecure } from "./useAxiosSecure";

// const useArticlesAdmin = () => {
//   const { data, refetch } = useQuery({
//     queryKey: ["adminArticles"], // Query key
//     queryFn: async () => {
//       const response = await axiosSecure.get("/articles/admin");
//       return response.data;
//     },
//   });

//   return {
//     articles: data?.articles || [], // Ensure default fallback values
//     total: data?.total || 0,
//     refetch,
//   };
// };

// export default useArticlesAdmin;

import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useArticlesAdmin = (page, limit) => {
  const { data, refetch } = useQuery({
    queryKey: ["adminArticles", page], // Include `page` in the query key
    queryFn: async () => {
      const response = await axiosSecure.get("/articles/admin", {
        params: { page, limit }, // Pass page and limit as query params
      });
      return response.data;
    },
    keepPreviousData: true, // Keep the previous data while fetching new data
  });

  return {
    articles: data?.articles || [],
    total: data?.total || 0,
    refetch,
  };
};

export default useArticlesAdmin;
