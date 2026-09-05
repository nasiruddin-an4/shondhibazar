"use client";
import {
  FiUsers,
  FiShield,
  FiArrowRight,
  FiAward,
  FiShoppingCart,
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { Sprout, Leaf } from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { value: "3", label: "Years in Operation", icon: FiAward },
    { value: "30", label: "Team Members", icon: FiUsers },
    { value: "134,554", label: "Happy Customers", icon: FiShoppingCart },
    { value: "2000+", label: "Products Available", icon: FiPackage },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">


      {/* Hero Section */}
      <section className="relative py-6 md:py-12 bg-white overflow-hidden">
        {/* Soft decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >

              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Everything You <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Eat and Drink</span> Matters
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Shondhi is a cooperative organization with an aim to "do green",
                grow organic, and focus on the food we eat and the air we
                breathe. Join us in our mission to leave the world better than
                we got it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-sm border-4 border-white">
                <img
                  src="/images/about_hero.jpg"
                  alt="Organic Farming Basket"
                  className="w-full h-[200px] lg:h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300 flex items-center space-x-5">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <FiAward className="text-3xl text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    Certified Organic
                  </div>
                  <div className="text-sm font-medium text-emerald-600">
                    100% Safe & Natural
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story & Stats */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Journey Started With a Simple Idea
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                SHONDHI, a Bengali word meaning "evening," is a cooperative
                organization where people from different walks of life come
                together to ensure access to safe, organic food.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Established in January 2019, we are proudly registered by the Government of Bangladesh. What started as a small community effort has blossomed into a movement for safer food.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-300 ${hoveredStat === index ? "-translate-y-2 shadow-xl ring-1 ring-emerald-500/20" : ""
                    }`}
                >
                  <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <stat.icon className="text-2xl text-emerald-600" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision (Glassmorphic) */}
      <section className="py-24 relative bg-gray-900 overflow-hidden">
        {/* Abstract dark background shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-900/40 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-emerald-100/70 max-w-2xl mx-auto">
              Driven by purpose, guided by nature. We exist to transform how you eat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/[0.15] transition-colors"
            >
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
                <FiShield className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-emerald-50/80 leading-relaxed text-lg">
                "Food Safety" is a way of life. From sourcing to packaging, we verify that every product is 100% safe and fit for human consumption. Our philosophy is rooted in uncompromising health standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] hover:bg-white/[0.15] transition-colors"
            >
              <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30">
                <Leaf className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-emerald-50/80 leading-relaxed text-lg">
                To be the country's most trusted online entity that commands absolute confidence in "Safe Food," making it accessible and affordable right at your doorstep.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Local Farmers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="/images/about_farmer.jpg"
                  alt="Farmer in golden field"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Empowering Communities</h3>
                  <p className="text-white/90 font-medium">Supporting 1,200+ local farming families.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 space-y-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Support Our <span className="text-emerald-600">Local Farmers</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                When you buy from small businesses, you're helping a CEO buy food
                for his family, a mom to pay for her kids' education, or a student
                to fund their dreams.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We work directly with local farmers to ensure fair trade
                practices, providing them with the support they need to thrive
                while delivering the freshest organic products to your table.
              </p>
              <div className="pt-4">
                <Link
                  href="/product-category"
                  className="inline-flex items-center text-emerald-600 font-bold text-lg group"
                >
                  Meet Our Artisans
                  <FiArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products We Offer */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Produce</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of organic products, sourced directly from our trusted partners.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Rice & Grains", img: "/images/category_grains.jpg" },
              { name: "Spices", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
              { name: "Oil & Ghee", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
              { name: "Meat & Fish", img: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&q=80" },
              { name: "Farm Eggs", img: "https://images.unsplash.com/photo-1506976773554-9457a44f77c2?w=500&q=80" },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-4 shadow-md bg-gray-200">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (3 Steps) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16">
              You Are 3 Steps Away From <span className="text-emerald-600">Safe Food</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>

              {[
                { step: "Pick Product", desc: "Browse our organic catalog", icon: FiShoppingCart },
                { step: "Pay securely", desc: "Multiple payment options", icon: FiShield },
                { step: "Fast Delivery", desc: "Straight to your doorstep", icon: FiCheckCircle },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative z-10 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-50 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                    <item.icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.step}</h3>
                  <p className="text-gray-500 font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-20">
              <Link
                href="/product-category"
                className="inline-flex items-center justify-center bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/30"
              >
                Start Shopping Now
                <FiArrowRight className="ml-3 text-2xl" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
