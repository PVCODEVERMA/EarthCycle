import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiCalendar,
  FiTag,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";
import bgImage from "../../../src/assets/blog/blog-breadcrumb.webp";
import { Link } from "react-router-dom";

const allPosts = [
  {
    id: 1,
    title: "Reducing Landfill Waste: Practical Solutions",
    date: "May 11, 2025",
    category: "Waste Management",
    author: "Admin",
    thumbnail: "https://picsum.photos/100/80?random=1",
    image: "https://picsum.photos/800/400?random=11",
    content:
      "Discover innovative strategies for effective waste management. Learn how modern cities are implementing sustainable practices to reduce landfill waste and promote recycling initiatives...",
  },
  {
    id: 2,
    title: "Effective Waste Management: Reducing, Recycling, and Reusing",
    date: "May 11, 2025",
    category: "Recycling",
    author: "Eco Team",
    thumbnail: "https://picsum.photos/100/80?random=2",
    image: "https://picsum.photos/800/400?random=12",
    content: "Content for post 2...",
  },
  {
    id: 3,
    title: "The Future of Waste Management: Sustainable Solutions",
    date: "May 10, 2025",
    category: "Sustainability",
    author: "Green Warrior",
    thumbnail: "https://picsum.photos/100/80?random=3",
    image: "https://picsum.photos/800/400?random=13",
    content: "Content for post 3...",
  },
  {
    id: 4,
    title: "Smart Recycling Techniques for Urban Areas",
    date: "May 9, 2025",
    category: "Urban Planning",
    author: "City Planner",
    thumbnail: "https://picsum.photos/100/80?random=4",
    image: "https://picsum.photos/800/400?random=14",
    content: "Content for post 4...",
  },
  {
    id: 5,
    title: "Composting 101: Turn Waste into Fertilizer",
    date: "May 8, 2025",
    category: "Composting",
    author: "Organic Guru",
    thumbnail: "https://picsum.photos/100/80?random=5",
    image: "https://picsum.photos/800/400?random=15",
    content: "Content for post 5...",
  },
  {
    id: 6,
    title: "Waste Management Innovation #1",
    date: "May 12, 2025",
    category: "Innovation",
    author: "Admin",
    thumbnail: "https://picsum.photos/120/80?random=20",
    image: "https://picsum.photos/800/400?random=20",
    content:
      "Latest technological advancements in waste processing and recycling...",
  },
  {
    id: 7,
    title: "Waste Management Innovation #1",
    date: "May 12, 2025",
    category: "Innovation",
    author: "Admin",
    thumbnail: "https://picsum.photos/120/80?random=20",
    image: "https://picsum.photos/800/400?random=20",
    content:
      "Latest technological advancements in waste processing and recycling...",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(allPosts[0]);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm mb-4">
        <Link to="/" className="text-gray-600 hover:underline">
          Home
        </Link>
        <span className="font-semibold text-gray-500"> &gt; </span>
        <Link
          to="/blog"
          className="text-[#e4a400] font-semibold hover:underline"
        >
          Blog
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[300px] w-full rounded-lg mb-12">
        <motion.div
          className="bg-green-500 text-white md:w-1/2 h-60 w-full py-12 px-8 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-lg">Smart Waste Disposal for a Cleaner Future</p>
          <div className="absolute bottom-6 right-6 opacity-10 text-[120px]">
            ♻️
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={bgImage}
            alt="Recycling"
            className="w-full h-60 object-cover"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <article className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <FiCalendar className="text-blue-500" /> {selectedPost.date}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <FiUser className="text-green-500" /> {selectedPost.author}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <FiTag className="text-red-500" /> {selectedPost.category}
                </span>
              </div>
            </div>

            <img
              src={selectedPost.image}
              alt="Main post"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedPost.content}
              </p>
              <button
                className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
                onClick={() => navigate(`/blog/${selectedPost.id}`)}
              >
                Read More <FiArrowRight className="ml-2" />
              </button>
            </div>
          </article>

          {allPosts.slice(5).map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex gap-4 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.thumbnail}
                className="w-32 h-24 object-cover rounded-lg"
                alt={`Post ${post.id}`}
              />
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <FiCalendar /> {post.date}
                </div>
                <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                <p className="text-gray-600 text-sm">
                  {post.content.substring(0, 80)}...
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
            <h3 className="text-xl font-bold mb-6 text-[#e4a400] border-b-2 pb-2">
              Popular Posts
            </h3>

            <div className="space-y-6">
              {allPosts.slice(0, 5).map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ x: 5 }}
                  className="flex gap-4 items-start group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-20 h-16 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div>
                    <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                      <FiCalendar className="text-blue-400" /> {post.date}
                    </p>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <FiUser className="inline" /> {post.author}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
