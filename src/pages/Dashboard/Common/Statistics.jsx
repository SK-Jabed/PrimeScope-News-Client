// import { Helmet } from "react-helmet-async";
// import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";

// const Statistics = () => {
//   return (
//     <div>
//       <Helmet>
//         <title>Dashboard | Statistics</title>
//       </Helmet>
//       <AdminStatistics />
//     </div>
//   );
// };

// export default Statistics;



import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const fetchPublishers = async () => {
  const { data } = await axiosSecure.get("/publishers");
  return data;
};

const fetchArticles = async () => {
  const { data } = await axiosSecure.get("/allArticles");
  return data;
};

const Statistics = () => {
  const { data: publishers = [], isLoading: publishersLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: fetchPublishers,
  });

  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  if (publishersLoading || articlesLoading) {
    return <div>Loading...</div>;
  }

  // Calculate data for the pie chart
  const articleCounts = publishers.map((publisher) => {
    const count = articles.filter(
      (article) => article.publisher.publisherName === publisher.name
    ).length;
    return { name: publisher.name, count };
  });

  const totalArticles = articleCounts.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const pieChartData = [
    ["Publisher", "Articles"],
    ...articleCounts.map((item) => [
      item.name,
      (item.count / totalArticles) * 100,
    ]),
  ];

  // Data for Bar Chart (Count of Articles per Publisher)
  const barChartData = [
    ["Publisher", "Articles"],
    ...articleCounts.map((item) => [item.name, item.count]),
  ];

  // Data for Line Chart (Views of Articles)
  const lineChartData = [
    ["Article", "Views"],
    ...articles.map((article) => [article.title, article.views]),
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Articles by Publishers (%)
          </h2>
          <Chart
            chartType="PieChart"
            data={pieChartData}
            options={{
              title: "Articles by Publishers",
              pieHole: 0.4,
              is3D: false,
              colors: ["#8e44ad", "#2980b9", "#27ae60", "#e74c3c", "#f1c40f"],
            }}
            width="100%"
            height="300px"
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Article Count by Publisher
          </h2>
          <Chart
            chartType="BarChart"
            data={barChartData}
            options={{
              title: "Article Count by Publisher",
              hAxis: { title: "Articles" },
              vAxis: { title: "Publisher" },
              colors: ["#3498db"],
            }}
            width="100%"
            height="300px"
          />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Views Per Article</h2>
          <Chart
            chartType="LineChart"
            data={lineChartData}
            options={{
              title: "Views Per Article",
              hAxis: { title: "Article" },
              vAxis: { title: "Views" },
              colors: ["#e67e22"],
            }}
            width="100%"
            height="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;

