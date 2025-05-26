import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import contactUs from '../../../src/assets/contactUs.jpg'
import { Link } from "react-router-dom";
import bgImage from "../../../src/assets/blog/blog-breadcrumb.webp";
import {  toast } from 'react-toastify';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast
      toast.success('Message sent successfully!');
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <FiMail />,
      title: 'Email Us',
      text: 'info@example.com',
      action: 'mailto:info@example.com'
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      text: '+91 98765 43210',
      action: 'tel:+919876543210'
    },
    {
      icon: <FiMapPin />,
      title: 'Visit Us',
      text: '123 Tech Street\nInnovation City, IN 560001',
      action: 'https://maps.google.com'
    }
  ];

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div className="text-sm mb-4">
    <Link to="/" className="text-gray-600 hover:underline">
      Home
    </Link>
    <span className="font-semibold text-gray-500"> &gt; </span>
    <Link
      to="/contact"
      className="text-[#e4a400] font-semibold hover:underline"
    >
      Contact
    </Link>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-center min-h-[300px] w-full rounded-lg ">
    <motion.div
      className="bg-green-500 text-white md:w-1/2 h-60 w-full py-12 px-8 relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl text-[#e4a400] font-bold mb-3">
        Get in Touch With Us
      </h1>
      <p className="text-sm font-bold mb-3">
        We're here to help. Reach out to us with your questions, feedback, or partnership inquiries.
      </p>

      <div className="absolute bottom-6 right-6 opacity-10 text-[120px]">
        ✉️
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
        alt="Contact Us"
        className="w-full h-60 object-cover"
      />
    </motion.div>
  </div>
</div>

    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${contactUs})` }}
    >
      <div className='bg-white bg-opacity-80 rounded-2xl p-4'>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We'd love to hear from you! Get in touch with any questions or feedback.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                       placeholder="Enter your full name..."
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      placeholder="Enter your email address..."
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number (Optional)
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                       placeholder="Enter your phone number....."
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                       placeholder="Write your message here..."
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiSend className="text-xl" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg"
                  >
                    Message sent successfully!
                  </motion.div>
                )}
              </div>
            </motion.form>

            {/* Contact Info Cards */}
            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 block"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-3xl text-blue-600">{method.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {method.text}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
