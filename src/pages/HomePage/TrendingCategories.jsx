
import { motion } from "framer-motion";

// const TrendingCategories = () => {
//      const categories = [
//     { name: "Politics", icon: "🤝", count: 124 },
//     { name: "Technology", icon: "📦", count: 89 },
//     { name: "Sports", icon: "🔎", count: 76 },
//     { name: "Entertainment", icon: "🤝", count: 102 },
//   ];
//   return (
//     <section className="py-10 max-w-6xl mx-auto px-4">
//       <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Trending Categories
//       </h2>
//       <div className="grid md:grid-cols-4 gap-6">
//         {categories.map((category, index) => (
//           <motion.div
//             key={index}
//             className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 transition hover:scale-105"
//             whileHover={{ scale: 1.05 }}
//           >
//             <image
//               src={category.icon}
//               alt={category.name}
//               width={50}
//               height={50}
//               className="w-12 h-12"
//             />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                 {category.name}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">{category.count} Articles</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TrendingCategories;


const TrendingCategories = () => {
  const categories = [
    { name: "Politics", icon: "🤝" },
    { name: "Technology", icon: "💻" },
    { name: "Sports", icon: "⚽" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Science", icon: "🔬" },
    { name: "Health", icon: "🏥" },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
        Trending Categories
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
        Explore the most discussed topics today
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center transition-transform hover:scale-110"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-5xl">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-3">{category.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCategories;