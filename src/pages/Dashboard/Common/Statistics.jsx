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
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Statistics Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          A detailed view of article statistics, including publisher
          contributions and view trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
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

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Views Per Article
          </h2>
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
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
          height="400px"
        />
      </div>
    </div>
  );
};

export default Statistics;