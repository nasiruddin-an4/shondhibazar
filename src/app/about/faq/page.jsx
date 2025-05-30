"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const faqs = [
    {
      question: "What is Shondhibazar.com, and what does it offer?",
      answer:
        "Shondhibazar.com is an online platform that connects farmers directly with consumers, offering fresh, safe, and quality food products sourced from local farmers.",
    },
    {
      question: "How does Shondhibazar.com ensure food safety?",
      answer:
        "We work directly with farmers we know and trust, implementing strict quality control measures and using natural preservation methods to ensure food safety from farm to table.",
    },
    {
      question: "Does Shondhibazar.com offer delivery services?",
      answer:
        "Yes, we offer delivery services across Dhaka with a flat shipping rate of BDT 80. We also provide pickup options from our store in Uttara.",
    },
    {
      question: "What is the main goal of Shondhibazar.com?",
      answer:
        "Our main goal is to create a transparent, climate-resilient food ecosystem that connects farmers directly with consumers while ensuring food safety and fair pricing.",
    },
    {
      question: "How does Shondhibazar.com source its products?",
      answer:
        "We source our products directly from local farmers through our cooperative network, ensuring fair prices for farmers and quality products for consumers.",
    },
    {
      question: "Does Shondhibazar.com provide natural preservation methods?",
      answer:
        "Yes, we use traditional and natural preservation methods to maintain the quality and safety of our products without harmful chemicals.",
    },
    {
      question: "What are the benefits of natural preservation methods?",
      answer:
        "Natural preservation methods help maintain nutritional value, reduce chemical exposure, and provide longer shelf life while keeping the food safe and healthy.",
    },
    {
      question: "How can I be sure that the products are safe to consume?",
      answer:
        "All our products go through strict quality control processes, and we work only with trusted farmers who follow safe farming practices.",
    },
    {
      question:
        "Are there any exclusive discounts or loyalty programs for customers?",
      answer:
        "Yes, we offer various promotional discounts and are developing a loyalty program to reward our regular customers.",
    },
    {
      question:
        "How can I contact Shondhibazar.com for inquiries or assistance?",
      answer:
        "You can contact us through our website contact form, call us at +880 1958 585 267, or visit our store in Uttara, Dhaka.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your question! We will get back to you soon.");
    setFormData({ name: "", email: "", question: "" });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-600 text-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/faq-banner.jpeg')",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Questions?</h1>
          <p className="text-xl">Questions? We got you covered!</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ List */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Common queries answered
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg"
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        setOpenFAQ(openFAQ === index ? null : index)
                      }
                    >
                      <span className="font-medium text-gray-800">
                        {faq.question}
                      </span>
                      {openFAQ === index ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Want to know more?
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your question here
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Type your question here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🚚</div>
              <h3 className="font-bold mb-2">Flat shipping rate</h3>
              <p className="text-gray-600">All over Dhaka BDT 80</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">↩️</div>
              <h3 className="font-bold mb-2">Easy 3 days returns</h3>
              <p className="text-gray-600">3 days money back guarantee</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🏪</div>
              <h3 className="font-bold mb-2">Pickup From Store</h3>
              <p className="text-gray-600">
                Plot 2/A, Road - 8, Block - C1, Sector - 15, Uttara, Dhaka
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-green-600 mb-4">🔒</div>
              <h3 className="font-bold mb-2">100% Secure Checkout</h3>
              <p className="text-gray-600">MasterCard / Visa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
