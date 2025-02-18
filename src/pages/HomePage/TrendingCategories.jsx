
import { motion } from "framer-motion";

const TrendingCategories = () => {
     const categories = [
    { name: "Politics", icon: "../../assets/placeholder.jpg", count: 124 },
    { name: "Technology", icon: "../../assets/placeholder.jpg", count: 89 },
    { name: "Sports", icon: "../../assets/placeholder.jpg", count: 76 },
    { name: "Entertainment", icon: "../../assets/placeholder.jpg", count: 102 },
  ];
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Trending Categories
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 transition hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <image
              src={category.icon}
              alt={category.name}
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {category.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{category.count} Articles</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCategories;
