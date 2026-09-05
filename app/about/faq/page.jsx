"use client";
import { useState } from "react";
import { ChevronDown, Plus, Minus, Mail, User as UserIcon, HelpCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      answer: "Shondhibazar.com is an online platform that connects farmers directly with consumers, offering fresh, safe, and quality food products sourced from local farmers.",
    },
    {
      question: "How does Shondhibazar.com ensure food safety?",
      answer: "We work directly with farmers we know and trust, implementing strict quality control measures and using natural preservation methods to ensure food safety from farm to table.",
    },
    {
      question: "Does Shondhibazar.com offer delivery services?",
      answer: "Yes, we offer delivery services across Dhaka with a flat shipping rate of BDT 80. We also provide pickup options from our store in Uttara.",
    },
    {
      question: "What is the main goal of Shondhibazar.com?",
      answer: "Our main goal is to create a transparent, climate-resilient food ecosystem that connects farmers directly with consumers while ensuring food safety and fair pricing.",
    },
    {
      question: "How does Shondhibazar.com source its products?",
      answer: "We source our products directly from local farmers through our cooperative network, ensuring fair prices for farmers and quality products for consumers.",
    },
    {
      question: "Does Shondhibazar.com provide natural preservation methods?",
      answer: "Yes, we use traditional and natural preservation methods to maintain the quality and safety of our products without harmful chemicals.",
    },
    {
      question: "What are the benefits of natural preservation methods?",
      answer: "Natural preservation methods help maintain nutritional value, reduce chemical exposure, and provide longer shelf life while keeping the food safe and healthy.",
    },
    {
      question: "How can I be sure that the products are safe to consume?",
      answer: "All our products go through strict quality control processes, and we work only with trusted farmers who follow safe farming practices.",
    },
    {
      question: "Are there any exclusive discounts or loyalty programs for customers?",
      answer: "Yes, we offer various promotional discounts and are developing a loyalty program to reward our regular customers.",
    },
    {
      question: "How can I contact Shondhibazar.com for inquiries or assistance?",
      answer: "You can contact us through our website contact form, call us at +880 1958 585 267, or visit our store in Uttara, Dhaka.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">How can we help you?</h1>
          <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl mx-auto">
            Browse our most frequently asked questions below or reach out to us directly if you can't find what you're looking for.
          </p>
        </div>
      </section>

      {/* FAQ & Contact Content */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-24">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* FAQ List */}
            <div className="p-8 md:p-12 lg:border-r border-gray-100 bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFAQ === index;
                  return (
                    <div
                      key={index}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 bg-white hover:border-emerald-100 hover:bg-gray-50/50'}`}
                    >
                      <button
                        className="w-full px-6 py-5 text-left flex justify-between items-center outline-none"
                        onClick={() => setOpenFAQ(isOpen ? null : index)}
                      >
                        <span className={`font-semibold pr-4 ${isOpen ? 'text-emerald-700' : 'text-gray-800'}`}>
                          {faq.question}
                        </span>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12 bg-gray-50/50">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-6">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                  Still have questions?
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and our dedicated support team will get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-emerald-500" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-500" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="question" className="text-sm font-bold text-gray-700">
                      Your Message
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-white border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
                      placeholder="How can we help you today?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flat shipping rate</h3>
              <p className="text-base text-gray-600">All over Dhaka BDT 80</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">↩️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy 3 days returns</h3>
              <p className="text-base text-gray-600">3 days money back guarantee</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🏪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pickup From Store</h3>
              <p className="text-base text-gray-600">Plot 2/A, Road - 8, Sector - 15, Uttara</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Checkout</h3>
              <p className="text-base text-gray-600">MasterCard / Visa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
