"use client";
import {
  FiLeaf,
  FiUsers,
  FiShield,
  FiArrowRight,
  FiAward,
  FiShoppingCart,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { Sprout } from "lucide-react";
import { motion } from "motion/react";

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { value: "3", label: "Years in Operation", icon: FiAward },
    { value: "30", label: "Team Members", icon: FiUsers },
    { value: "134,554", label: "Happy Customers", icon: FiShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href="/" className="hover:underline text-green-700">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-semibold">About</li>
        </ol>
      </nav>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br  from-[#C9D158] via-[#a9b13f] to-emerald-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-5 py-2 bg-emerald-100/90 backdrop-blur-sm text-emerald-800 rounded-full text-sm font-medium shadow-sm">
                <Sprout className="mr-2 text-lg" />
                ShondhiBazar
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Everything You <br />
                <span className="text-emerald-600">Eat and Drink</span> Matters
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                Shondhi is a cooperative organization with an aim to “do green”,
                grow organic, and focus on the food we eat and the air we
                breathe. Join us in our mission to leave the world better than
                we got it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about/story"
                  className="inline-flex items-center justify-center bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  Discover Our Story
                  <FiArrowRight className="ml-3 text-xl" />
                </Link>
                <Link
                  href="/product-category"
                  className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Organic Farming"
                className="w-full h-96 lg:h-[600px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-3xl"></div>
              <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-xl shadow-xl border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <FiAward className="text-2xl text-emerald-600" />
                  <div>
                    <div className="font-semibold text-gray-900 text-base">
                      Certified Organic
                    </div>
                    <div className="text-sm text-gray-500">
                      Since January 2019
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SHONDHI, a Bengali word meaning “evening,” is a cooperative
              organization where people from different walks of life come
              together to ensure access to safe, organic food. Established in
              January 2019, we are registered by the Government of Bangladesh.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`relative text-center bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 ${
                  hoveredStat === index ? "scale-105 shadow-2xl" : ""
                }`}
              >
                <stat.icon className="text-4xl mx-auto mb-4" />
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Mission & Vision
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are committed to providing safe, organic food while supporting
              local farmers and promoting sustainability.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <img
                src="https://shondhibazar.com/wp-content/uploads/2022/09/food-safety-mode-449x374.png"
                alt="Food Safety Model"
                className="mx-auto h-64 w-64 lg:h-80 lg:w-80 object-contain rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-emerald-600 text-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-base leading-relaxed">
                  “Food Safety” is not just an initiative to us – it is a way of
                  life. From the top executive to the frontline worker, every
                  employee participates in maintaining and verifying “Food
                  Safety” as the foundation of our philosophy, ensuring the
                  sourcing, processing, packaging, and selling of food that is
                  safe and fit for human consumption.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-teal-600 text-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-base leading-relaxed">
                  To be a leading online e-commerce entity in the country that
                  commands the confidence of “Safe Food,” making it accessible
                  at an affordable price and available at the doorstep of the
                  client, with an aim of protecting the health of the masses.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Local Farmers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Support Local Farmers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              When you buy from small businesses, you’re helping a CEO buy food
              for his family, a mom to pay for her kids’ education, or a student
              to fund their dreams.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmer in field"
                className="w-full h-96 object-cover rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-emerald-600">
                Empowering Communities
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We work directly with local farmers to ensure fair trade
                practices, providing them with the support they need to thrive
                while delivering the freshest organic products to your table.
              </p>
              <Link
                href="/product-category"
                className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300"
              >
                Shop Now
                <FiArrowRight className="ml-3 text-xl" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Artisan */}
      <section className="py-20 bg-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Artisan, Our Strength
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated farmers and artisans who make our mission
              possible. Their commitment to quality and sustainable farming
              practices ensures that we can deliver the best products to your
              table.
            </p>
          </motion.div>
          <Link
            href="/about/artisan"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Meet Our Artisan
          </Link>
        </div>
      </section>

      {/* Products We Offer */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What We’re Selling
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our wide range of organic products, sourced directly from
              local farmers.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Grains", img: "/placeholder.svg?height=200&width=200" },
              { name: "Spices", img: "/placeholder.svg?height=200&width=200" },
              {
                name: "Oil & Ghee",
                img: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Meat & Fish",
                img: "/placeholder.svg?height=200&width=200",
              },
              { name: "Eggs", img: "/placeholder.svg?height=200&width=200" },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {product.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              You Are 3 Steps Away From Safe Food
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              {[
                {
                  step: "Pick Product",
                  img: "/images/i3.jpg",
                },
                {
                  step: "Pay Bill or COD",
                  img: "/images/i2.png",
                },
                {
                  step: "Delivery",
                  img: "/images/i1.jpg",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="space-y-4"
                >
                  <img
                    src={step.img}
                    alt={step.step}
                    className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-white"
                  />
                  <h3 className="text-xl font-semibold">{step.step}</h3>
                </motion.div>
              ))}
            </div>
            <Link
              href="/product-category"
              className="mt-10 inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Start Shopping Now
              <FiArrowRight className="ml-3 text-xl" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
