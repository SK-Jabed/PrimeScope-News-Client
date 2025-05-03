import { motion } from "framer-motion";

const EditorsPick = () => {
  const editorPicks = [
    {
      title: "Breaking News: Market Crash!",
      summary:
        "Stock market takes a steep downturn, leaving investors in shock. Experts weigh in on the future of global finances and what this means for businesses worldwide.",
      image: "https://i.ibb.co.com/tp5VWNmt/a-50f464.webp",
      author: "John Doe",
      date: "Feb 20, 2025",
    },
    {
      title: "AI Revolution in Journalism",
      summary:
        "Artificial intelligence is transforming how news is reported, raising ethical concerns. Journalists explore the benefits and risks of AI-driven reporting in the media landscape.",
      image:
        "https://i.ibb.co.com/d00Tbnt1/16396162-rm373batch5-blogbanner-08.jpg",
      author: "Jane Smith",
      date: "Feb 19, 2025",
    },
    {
      title: "Tech Giants Battle for Supremacy",
      summary:
        "Apple, Google, and Microsoft continue their battle for market dominance. Each company is launching innovative products to stay ahead in the race for tech supremacy.",
      image: "https://i.ibb.co.com/XrtvBr65/1733148410052.png",
      author: "Alex Brown",
      date: "Feb 18, 2025",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100 dark:bg-gray-900 text-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Editor’s Pick
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
        Curated articles from our top editors
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {editorPicks.map((article, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                {article.summary}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                By{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {article.author}
                </span>{" "}
                • {article.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorsPick;
