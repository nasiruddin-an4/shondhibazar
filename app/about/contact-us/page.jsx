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
  User as UserIcon,
  Briefcase
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSendContactMessageMutation } from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

const ContactUs = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [sendContactMessage, { isLoading: isSubmitting }] = useSendContactMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        company: formState.company || undefined,
        message: formState.message,
      }).unwrap();
      setSubmitStatus("success");
      setFormState({ name: "", email: "", phone: "", company: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Couldn't send your message — please try again"));
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+880 1958 585 267"],
      color: "emerald",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["contact@shondhibazar.com"],
      color: "teal",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Plot 2/A, Road - 8, Block - C1", "Sector - 15, Uttara, Dhaka"],
      color: "green",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaLinkedin, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Whether you have a question about products, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <method.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {method.title}
              </h3>
              <ul className="space-y-2">
                {method.details.map((detail, i) => (
                  <li key={i} className="text-lg text-gray-600">
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            
            {/* Left side: Info */}
            <div className="p-10 md:p-16 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-6">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                  Let's Start a Conversation
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Fill out the form and our support team will get back to you within 24 hours. We are dedicated to providing the best service for our customers and partners.
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map(({ icon: Icon, href }, idx) => (
                      <motion.a
                        key={idx}
                        href={href}
                        className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-100 hover:bg-emerald-600 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side: Form */}
            <div className="p-10 md:p-16 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-emerald-500" />
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-500" />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="+880 1XXX XXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-emerald-500" />
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-full transition-all shadow-lg shadow-emerald-500/30"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-2xl border border-emerald-100"
                  >
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                    <span className="font-medium">Thank you! We've received your message and will respond shortly.</span>
                  </motion.div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
