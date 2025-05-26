import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Bulk Waste Collection',
      content: 'Efficient handling of industrial and commercial waste volumes',
      icon: '🚛'
    },
    {
      title: 'Smart Scheduling System', 
      content: '24/7 online portal for pickup requests and tracking',
      icon: '📅'
    },
    {
      title: 'Waste Stream Optimization',
      content: 'Expert segregation and recycling guidance',
      icon: '♻️'
    },
    {
      title: 'Cost-Effective Solutions',
      content: 'Transparent pricing with no hidden charges',
      icon: '💸'
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Rating Badge */}
        <div 
          className="bg-[#e4a400] text-white w-fit px-6 py-2 rounded-full mb-8 mx-auto"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="text-2xl font-bold">4.8/5</span> Customer Satisfaction
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <div className="lg:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Choose EcoManage
              <span className="block text-green-600 text-xl mt-2">
                Leading the Way in Eco-Friendly Waste Solutions
              </span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              As a certified waste management partner, we combine cutting-edge technology with sustainable practices. 
              Our end-to-end solutions include:
              <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Compliance with environmental regulations
                    </p>
                   
                  </div>
                </div>
              <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Advanced waste tracking systems
                    </p>
                   
                  </div>
                </div>
              <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                      Customized recycling programs
                    </p>
                   
                  </div>
                </div>
              <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">
                     Community education initiatives
                    </p>
                   
                  </div>
                </div>
            
            </p>

            <div 
              className="h-px bg-gray-300 my-8"
              data-aos="fade-right"
              data-aos-delay="400"
            />
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-delay={index * 150 + 300}
                >
                  <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.content}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div 
              className="mt-8 text-center"
              data-aos="fade-up"
              data-aos-delay="900"
            >
              <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto">
                Explore Our Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;