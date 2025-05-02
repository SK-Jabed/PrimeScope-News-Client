import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArticlesAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminArticles");
      return res.data;
    },
  });

  return { articles, loading, refetch };
};

export default useArticlesAdmin;
