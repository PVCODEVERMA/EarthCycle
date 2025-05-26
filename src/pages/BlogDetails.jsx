import { useParams } from "react-router-dom";
import allPosts from "./BlogData";
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiArrowLeft,
  FiMessageSquare,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = allPosts.find((post) => post.id === parseInt(id));
  const relatedPosts = allPosts
    .filter((post) => post.id !== blog?.id)
    .slice(0, 3);

  if (!blog)
    return (
      <div className="min-h-screen bg-[#f7fce7] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Post Not Found
          </h2>
          <Link
            to="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-[#f7fce7] py-12 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-800 mb-6 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            All Posts
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
          >
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-green-900 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FiUser className="text-green-600" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FiCalendar className="text-green-600" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <FiTag className="text-green-600" />
                  <span>{blog.category}</span>
                </div>
              </div>

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md"
              />

              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                {blog.content}

                {/* Example Content Section */}
                <div className="mt-8 p-6 bg-green-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">
                    Key Takeaways
                  </h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <div className="flex items-start gap-4 ">
                      <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <div>
                        <p className="text-sm mt-1 font-semibold text-gray-800 mb-2">
                          Effective waste segregation methods
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 ">
                      <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <div>
                        <p className="text-sm mt-1 font-semibold text-gray-800 mb-2">
                          Community engagement strategies
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 ">
                      <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <div>
                        <p className="text-sm mt-1 font-semibold text-gray-800 mb-2">
                          Sustainable recycling techniques
                        </p>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
          >
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
              <FiMessageSquare className="text-green-600" />
              Comments
            </h3>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Your Comment</label>
                <textarea
                  rows="4"
                  className="w-full p-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Share your thoughts..."
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Post Comment
              </button>
            </form>
          </motion.div>
        </div>

        {/* Related Posts Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h4 className="text-xl font-bold text-green-900 mb-6">
              Related Posts
            </h4>
            <div className="space-y-6">
              {relatedPosts.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="group block"
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4"
                  >
                    <img
                      src={post.thumbnail}
                      alt="thumbnail"
                      className="w-20 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h5 className="font-semibold text-green-900 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h5>
                      <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">
            <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for latest eco tips and updates.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/70"
              />
              <button
                type="submit"
                className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
