import { motion } from "framer-motion";

const EditorsPick = () => {
      const editorPicks = [
    {
      title: "Breaking News: Market Crash!",
      summary: "Stock market sees an unexpected downturn...",
      image: "../../assets/placeholder.jpg",
      link: "/article/market-crash",
    },
    {
      title: "AI Revolution in Journalism",
      summary: "How artificial intelligence is shaping news reporting...",
      image: "../../assets/placeholder.jpg",
      link: "/article/ai-journalism",
    },
    {
      title: "Tech Giants Battle for Supremacy",
      summary: "The latest clash between Apple, Google, and Microsoft...",
      image: "../../assets/placeholder.jpg",
      link: "/article/tech-war",
    },
  ];
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Editor’s Pick
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {editorPicks.map((article, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transition hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <image
              src={article.image}
              alt={article.title}
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {article.summary}
              </p>
              <a
                href={article.link}
                className="text-blue-600 dark:text-blue-400 font-medium inline-block mt-3"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorsPick;
