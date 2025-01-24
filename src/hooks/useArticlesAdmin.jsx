// // import { useQuery } from "@tanstack/react-query";
// // import { axiosSecure } from "./useAxiosSecure";

// // const useArticlesAdmin = () => {
// //   const { data, refetch } = useQuery({
// //     queryKey: ["adminArticles"], // Query key
// //     queryFn: async () => {
// //       const response = await axiosSecure.get("/articles/admin");
// //       return response.data;
// //     },
// //   });

// //   return {
// //     articles: data?.articles || [], // Ensure default fallback values
// //     total: data?.total || 0,
// //     refetch,
// //   };
// // };

// // export default useArticlesAdmin;

// import { useQuery } from "@tanstack/react-query";
// import { axiosSecure } from "./useAxiosSecure";

// const useArticlesAdmin = () => {
//   const fetchArticles = async () => {
//     const { data } = await axiosSecure.get("/adminArticles");
//     return data;
//   };
// console.log(data);
//   const {
//     data: articles,
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["articles"],
//     queryFn: fetchArticles,
//   });

//   return { articles, isLoading, isError, refetch };
// };

// export default useArticlesAdmin;



// const axiosSecure = useAxiosSecure();

// const { data: users = [], refetch } = useQuery({
//   queryKey: ["users"],
//   queryFn: async () => {
//     const res = await axiosSecure.get("/users");
//     return res.data;
//   },
// });


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useArticlesAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    isPending: loading,
    refetch
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