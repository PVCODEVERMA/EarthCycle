import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaEnvelope, FaExclamationTriangle, FaComments, FaSearch, FaArrowRight } from 'react-icons/fa';
import { MdOutlineSupportAgent, MdOutlineFeedback } from 'react-icons/md';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqCategories = [
    {
      id: 'general',
      name: 'General Questions',
      icon: <FaComments className="text-green-500" />,
      questions: [
        {
          q: "What items can I recycle through EarthCycle?",
          a: "We accept all electronic waste including smartphones, laptops, tablets, monitors, printers, and household appliances. Visit our Accepted Items page for a full list."
        },
        {
          q: "Is there a fee for eWaste collection?",
          a: "Basic collection is free for most items. Large quantities or special items may incur a small fee which will be communicated upfront."
        }
      ]
    },
    {
      id: 'collection',
      name: 'Collection Process',
      icon: <FaRecycle className="text-blue-500" />,
      questions: [
        {
          q: "How do I schedule a pickup?",
          a: "Log into your dashboard and use the 'Schedule Pickup' feature. Select your preferred date and time slot."
        },
        {
          q: "How should I prepare my eWaste for collection?",
          a: "Please remove any personal data from devices. Place items in a secure box or bag. For monitors/TVs, protect the screen with padding."
        }
      ]
    },
    {
      id: 'data',
      name: 'Data Security',
      icon: <FaLock className="text-purple-500" />,
      questions: [
        {
          q: "How do you ensure my data is secure?",
          a: "All storage devices undergo certified data destruction processes. We provide a Data Destruction Certificate for every device processed."
        },
        {
          q: "Can I get proof of data destruction?",
          a: "Yes, we provide digital certificates of destruction for all storage-containing devices processed through our facility."
        }
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({ name, email, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    
    // Reset form after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FaHeadset className="w-8 h-8 text-[#e4a400]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">EarthCycle Support Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            How can we help you today? Find answers, contact support, or report issues with our eWaste collection services.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search help articles, FAQs, or topics..."
                className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition"
              />
              <button className="absolute right-2 top-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition">
                Search <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Support Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { 
              id: 'faq', 
              icon: <FaComments className="w-6 h-6 	text-blue-600 " />, 
              title: 'FAQs', 
              description: 'Find answers to common questions' 
            },
            { 
              id: 'contact', 
              icon: <MdOutlineSupportAgent className="w-6 h-6 text-yellow-600" />, 
              title: 'Contact Support', 
              description: 'Get personalized assistance' 
            },
            { 
              id: 'report', 
              icon: <FaExclamationTriangle className="w-6 h-6 text-red-600" />, 
              title: 'Report Issue', 
              description: 'Report service problems' 
            },
            { 
              id: 'feedback', 
              icon: <MdOutlineFeedback className="w-6 h-6 text-purple-600" />, 
              title: 'Feedback', 
              description: 'Share your experience' 
            }
          ].map((tab) => (
            <motion.div
              key={tab.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 rounded-xl shadow-sm cursor-pointer transition-all ${
                activeTab === tab.id 
                  ? 'bg-white border-2 border-green-500 shadow-md' 
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                activeTab === tab.id ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {tab.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{tab.title}</h3>
              <p className="text-gray-600">{tab.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-10">
                {faqCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center mb-6">
                      <div className="mr-3">{category.icon}</div>
                      <h3 className="text-2xl font-semibold text-gray-800">{category.name}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.questions.map((item, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                          <h4 className="font-semibold text-lg text-gray-800">{item.q}</h4>
                          <p className="text-gray-600 mt-2">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Can't find what you're looking for? Our support team is ready to help.
                </p>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center transition"
                >
                  Contact Support <FaArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Contact Support */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Support</h2>
              <p className="text-gray-600 mb-8">
                Our team is available Monday-Friday, 9AM-6PM. We typically respond within 24 hours.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Send us a message</h3>
                  
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FaCheckCircle className="text-green-600 mr-3 text-xl" />
                        <h4 className="text-lg font-medium">Message Sent Successfully!</h4>
                      </div>
                      <p className="mt-2">
                        Thank you for contacting EarthCycle support. Our team will respond to your inquiry within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 mb-2">How can we help?</label>
                        <textarea
                          id="message"
                          rows="5"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                          placeholder="Describe your issue or question"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition w-full"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Other ways to reach us</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaPhone className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Phone Support</h4>
                        <p className="text-gray-600 mt-1">+91 98765 43210</p>
                        <p className="text-sm text-gray-500 mt-2">Monday-Friday, 9AM-6PM IST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaEnvelope className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Email Support</h4>
                        <p className="text-gray-600 mt-1">support@earthcycle.in</p>
                        <p className="text-sm text-gray-500 mt-2">For non-urgent inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaWhatsapp className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">WhatsApp Support</h4>
                        <p className="text-gray-600 mt-1">+91 98765 43210</p>
                        <p className="text-sm text-gray-500 mt-2">Text us anytime for quick assistance</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-blue-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Emergency Pickup Issues</h4>
                      <p className="text-gray-600 mb-4">
                        For urgent issues with scheduled pickups, please call our hotline for immediate assistance.
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                        <FaPhone className="mr-2" /> Call Hotline: +91 98765 43211
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Report Issue */}
          {activeTab === 'report' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Report an Issue</h2>
              <p className="text-gray-600 mb-8">
                Let us know about any problems with our service so we can make it right.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Report a service issue</h3>
                  
                  <form>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Issue Type</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition">
                        <option>Select issue type</option>
                        <option>Missed pickup</option>
                        <option>Damaged items during collection</option>
                        <option>Billing issue</option>
                        <option>Service quality</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Service Date (if applicable)</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Description of Issue</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Please describe the issue in detail"
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Upload Photos (optional)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <FaCloudUploadAlt className="text-gray-400 text-3xl mx-auto mb-2" />
                        <p className="text-gray-500">Drag & drop images here or click to browse</p>
                        <p className="text-sm text-gray-400 mt-1">Max file size: 5MB</p>
                      </div>
                    </div>
                    
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition w-full">
                      Submit Report
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Common Issues & Solutions</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">Missed pickup?</h4>
                      <p className="text-gray-600 mt-1">
                        We apologize for the inconvenience. Please report the missed pickup and we'll reschedule immediately, 
                        usually within 24 hours.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">Damaged items during collection?</h4>
                      <p className="text-gray-600 mt-1">
                        Our collectors are trained to handle items carefully. If damage occurs, please report with photos 
                        and we'll arrange compensation.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-800">Billing questions?</h4>
                      <p className="text-gray-600 mt-1">
                        Check your invoice details in your account. If charges seem incorrect, report the issue with 
                        your invoice number.
                      </p>
                    </div>
                    
                    <div className="mt-8 bg-orange-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Need immediate assistance?</h4>
                      <p className="text-gray-600 mb-4">
                        For urgent issues requiring immediate attention, please call our support hotline.
                      </p>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center">
                        <FaPhone className="mr-2" /> Call Hotline: +91 98765 43211
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Feedback */}
          {activeTab === 'feedback' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Feedback</h2>
              <p className="text-gray-600 mb-8">
                We value your opinion! Help us improve our eWaste collection services.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Tell us about your experience</h3>
                  
                  <form>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Service Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-2xl text-gray-300 cursor-pointer hover:text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">What did you like most?</label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Tell us what worked well"
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">How can we improve?</label>
                      <textarea
                        rows="3"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="Suggestions for improvement"
                      ></textarea>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Would you recommend EarthCycle to others?</label>
                      <div className="flex space-x-4 mt-2">
                        <label className="flex items-center">
                          <input type="radio" name="recommend" className="h-4 w-4 text-green-600" />
                          <span className="ml-2 text-gray-700">Definitely</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="recommend" className="h-4 w-4 text-green-600" />
                          <span className="ml-2 text-gray-700">Probably</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="recommend" className="h-4 w-4 text-green-600" />
                          <span className="ml-2 text-gray-700">Not sure</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="recommend" className="h-4 w-4 text-green-600" />
                          <span className="ml-2 text-gray-700">Probably not</span>
                        </label>
                      </div>
                    </div>
                    
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition w-full">
                      Submit Feedback
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Why your feedback matters</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaRocket className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Improve our services</h4>
                        <p className="text-gray-600 mt-1">
                          Your suggestions help us enhance our collection processes and customer experience.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaLeaf className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Promote sustainability</h4>
                        <p className="text-gray-600 mt-1">
                          Better eWaste recycling processes contribute to a cleaner environment for everyone.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaGift className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Get rewards</h4>
                        <p className="text-gray-600 mt-1">
                          We regularly reward our most active feedback providers with recycling credits and discounts.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-purple-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Join our Community Council</h4>
                      <p className="text-gray-600 mb-4">
                        Provide regular feedback and help shape EarthCycle's future. Members get exclusive benefits.
                      </p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};


const FaRecycle = () => <span>♻️</span>;
const FaLock = () => <span>🔒</span>;
const FaWhatsapp = () => <span>📱</span>;
const FaCheckCircle = () => <span>✅</span>;
const FaCloudUploadAlt = () => <span>📁</span>;
const FaStar = () => <span>⭐</span>;
const FaRocket = () => <span>🚀</span>;
const FaLeaf = () => <span>🍃</span>;
const FaGift = () => <span>🎁</span>;

export default SupportCenter;