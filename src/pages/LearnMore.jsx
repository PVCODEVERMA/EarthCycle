"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CTAButton from "@/components/ui/cta-button";
import { BoxesCore } from "../components/ui/background-boxes";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CheckIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const LearnMore = () => {
  const stats = [
    { value: 15000, suffix: "+", label: "Tons Recycled Annually" },
    { value: 98, suffix: "%", label: "Diversion Rate" },
    { value: 500, suffix: "+", label: "Businesses Served" },
  ];

  const processSteps = [
    {
      title: "Assessment",
      description: "On-site waste audit and needs analysis",
    },
    {
      title: "Custom Plan",
      description: "Tailored waste management strategy",
    },
    {
      title: "Implementation",
      description: "Full-service setup and training",
    },
    {
      title: "Monitoring",
      description: "Real-time tracking and optimization",
    },
  ];

  const faqs = [
    {
      question: "What materials do you recycle?",
      answer: "We process all major recyclables including paper, plastic, metal, glass, and organic waste.",
    },
    {
      question: "How do you ensure compliance?",
      answer: "Our system automatically tracks and generates reports for all environmental regulations.",
    },
  ];

  const AnimatedStat = ({ value, suffix, label }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.05 }}
        className="text-center p-6 bg-white rounded-lg"
      >
        <div className="text-4xl font-bold text-[#e4a400] mb-2">
          {inView ? (
            <CountUp
              start={0}
              end={value}
              duration={2}
              separator=","
              suffix={suffix}
            />
          ) : (
            <span>0{suffix}</span>
          )}
        </div>
        <div className="text-gray-600">{label}</div>
      </motion.div>
    );
  };

  return (
    <div className={cn("px-4 py-12 relative overflow-hidden")}>
      <div className="absolute inset-0 pointer-events-none -z-10">
        <BoxesCore />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Sustainable Waste Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Pioneering eco-friendly waste management through innovation and technology
          </p>
        </motion.section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial Recycling",
                description: "Comprehensive programs for businesses of all sizes",
                features: ["Custom sorting systems", "Automated reporting", "Sustainability certifications"],
              },
              {
                title: "Hazardous Waste",
                description: "Safe disposal of regulated materials",
                features: ["Fully licensed", "EPA compliant", "24/7 emergency response"],
              },
              {
                title: "Organic Recovery",
                description: "Food waste composting solutions",
                features: ["Closed-loop system", "Soil amendment production", "Carbon credit programs"],
              },
            ].map((service, index) => (
              <ServiceDetail key={index} {...service} />
            ))}
          </div>
        </section>

        {/* Process Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="relative">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} totalSteps={processSteps.length} />
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-green-50 p-8 rounded-2xl mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Reduced our landfill waste by 90% in just 6 months!",
                author: "Sarah Johnson, Hotel Chain Manager",
              },
              {
                quote: "The real-time tracking system gives us complete transparency.",
                author: "Michael Chen, Manufacturing Director",
              },
            ].map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#e4a400]/10 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Waste Management?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses achieving sustainability goals with our smart solutions
          </p>
          <CTAButton>Start Today</CTAButton>
        </section>
      </div>
    </div>
  );
};

// Sub-components
const ServiceDetail = ({ title, description, features }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg"
  >
    <h3 className="text-2xl font-bold text-[#e4a400] mb-4">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ProcessStep = ({ step, index, totalSteps }) => (
  <div className="relative pl-8 pb-8">
    <div className="absolute left-0 top-0 w-4 h-full">
      <div className="w-1 h-full bg-gray-200 ml-1.5" />
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#e4a400] rounded-full" />
    </div>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="ml-8"
    >
      <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
      <p className="text-gray-600 mt-2">{step.description}</p>
    </motion.div>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <blockquote className="text-gray-600 italic mb-4">"{quote}"</blockquote>
    <div className="text-gray-800 font-medium">– {author}</div>
  </motion.div>
);

const FAQItem = ({ question, answer }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </motion.div>
);

export default LearnMore;