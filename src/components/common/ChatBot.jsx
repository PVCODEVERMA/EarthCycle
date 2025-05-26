
import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your Waste Management Assistant. Ask me about our services or pricing plans!",
      isBot: true,
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const faqResponses = {
    "pricing": "We offer 3 plans: Free (₹0/mo), Professional (₹499/mo), and Business (₹1,299/mo). All include 10kg free waste disposal!",
    "services": "Our services include waste collection, recycling, analytics reports, and 24/7 support.",
    "contact": "Please contact us at support@wastemgmt.com or call +91 12345 67890",
    "default": "I'm sorry, I didn't understand that. Please contact our team directly at support@wastemgmt.com or call +91 12345 67890"
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Add bot response
    const lowerText = inputText.toLowerCase();
    let response = faqResponses.default;
    
    if (lowerText.includes("price") || lowerText.includes("plan")) {
      response = faqResponses.pricing;
    } else if (lowerText.includes("service") || lowerText.includes("collect")) {
      response = faqResponses.services;
    } else if (lowerText.includes("contact") || lowerText.includes("call")) {
      response = faqResponses.contact;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Waste Management Support</h3>
            <p className="text-sm">Ask me about services or pricing</p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-green-600 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-3 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Real agents available 8AM-8PM IST
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;