"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowRight,
  Clock,
  Users,
  Building,
  CheckCircle,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormState({ name: "", email: "", phone: "", company: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const stats = [
    {
      icon: Clock,
      value: "24/7",
      label: "Support Available",
      description: "Round the clock assistance",
    },
    {
      icon: Users,
      value: "10k+",
      label: "Happy Clients",
      description: "Trusted by businesses",
    },
    {
      icon: MessageCircle,
      value: "1hr",
      label: "Response Time",
      description: "Quick resolution",
    },
    {
      icon: Building,
      value: "15+",
      label: "Global Offices",
      description: "Worldwide presence",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@example.com", "sales@example.com"],
      color: "green",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Business Avenue", "New York, NY 10001"],
      color: "purple",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, color: "bg-blue-500", href: "#" },
    { icon: FaTwitter, color: "bg-sky-500", href: "#" },
    { icon: FaInstagram, color: "bg-pink-500", href: "#" },
    { icon: FaLinkedin, color: "bg-blue-700", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-300 to-green-600 text-white py-24">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We'd love to hear from you. Let's build something amazing
              together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-${method.color}-100 flex items-center justify-center mb-6`}
                >
                  <method.icon className={`w-8 h-8 text-${method.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <ul className="space-y-2">
                  {method.details.map((detail, i) => (
                    <li key={i} className="text-gray-600">
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Let's Start a Conversation
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map(({ icon: Icon, color, href }) => (
                    <motion.a
                      key={href}
                      href={href}
                      className={`${color} p-3 rounded-lg text-white hover:opacity-90 transition-opacity duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) =>
                        setFormState({ ...formState, company: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg"
                  >
                    <CheckCircle size={20} />
                    <span>Thank you! We'll get back to you soon.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
