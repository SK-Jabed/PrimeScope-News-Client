import React from "react";
import AOS from "aos";
import { gsap } from "gsap";
import "aos/dist/aos.css";

const UniqueSections = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
    gsap.fromTo(
      ".avatar",
      { y: 0 },
      { y: 10, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut" }
    );
  }, []);

  return (
    <div>
      {/* Section 1: Spotlight on Readers */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-6 text-gray-800 dark:text-white"
            data-aos="fade-up"
          >
            Spotlight on Readers
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 mb-12"
            data-aos="fade-up"
          >
            Discover what our readers are saying about the latest articles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                comment:
                  "This article changed my perspective on the topic entirely!",
                avatar: "https://i.ibb.co/QJTQxBQ/cr7.jpg",
              },
              {
                name: "Jane Smith",
                comment:
                  "I’ve been following this website for months, and it’s amazing!",
                avatar: "https://i.ibb.co/k5Pqy6C/neymar-jr-pic.jpg",
              },
              {
                name: "Sam Wilson",
                comment:
                  "Fantastic insights and great writing. Highly recommend!",
                avatar: "https://i.ibb.co/jMfKQV2/messi.jpg",
              },
            ].map((reader, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={200 * idx}
              >
                <img
                  src={reader.avatar}
                  alt={reader.name}
                  className="avatar w-16 h-16 mx-auto rounded-full border-4 border-indigo-500"
                />
                <h3 className="mt-4 text-lg font-bold dark:text-white">
                  {reader.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 italic">
                  "{reader.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Explore Categories */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-indigo-700 dark:to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
            Explore Categories
          </h2>
          <p className="text-lg mb-12" data-aos="fade-up">
            Dive into your favorite topics and discover more articles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technology",
                description: "The latest in tech innovation and gadgets.",
                icon: "💻",
              },
              {
                title: "Health & Wellness",
                description: "Tips and articles for a healthy lifestyle.",
                icon: "🩺",
              },
              {
                title: "Travel",
                description: "Explore destinations and travel guides.",
                icon: "✈️",
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={200 * idx}
              >
                <div className="text-6xl">{category.icon}</div>
                <h3 className="mt-4 text-xl font-bold dark:text-white">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {category.description}
                </p>
                <button className="mt-4 bg-indigo-500 dark:bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-800 transition">
                  View Articles
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniqueSections;
