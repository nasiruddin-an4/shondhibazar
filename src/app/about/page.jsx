"use client";
import {
  FiLeaf,
  FiUsers,
  FiShield,
  FiArrowRight,
  FiAward,
  FiSun,
} from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { Sprout } from "lucide-react";

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-emerald-100 to-teal-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 rounded-full text-sm font-medium">
                <Sprout className="mr-2 text-lg" />
                Our Journey
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Crafting a <span className="text-emerald-600">Sustainable</span>{" "}
                Future
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md sm:max-w-lg">
                Shondhi is a cooperative dedicated to organic excellence,
                connecting farmers and consumers with safe, chemical-free food
                for a healthier planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/our-artisan"
                  className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                >
                  Meet Our Farmers
                  <FiArrowRight className="ml-2 text-lg" />
                </Link>
                <Link
                  href="/safe-food"
                  className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  Our Standards
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Organic Farming"
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent rounded-3xl"></div>
              <div className="absolute -bottom-6 sm:-bottom-8 -left-4 sm:-left-6 bg-white p-4 sm:p-5 rounded-xl shadow-xl border border-gray-100 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="flex items-center space-x-3">
                  <FiAward className="text-xl sm:text-2xl text-emerald-600" />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      Award Winner
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      Impactful Business 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shondhi, meaning "evening" in Bengali, unites farmers and
              professionals to deliver organic, high-quality food through
              innovative digital logistics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "3", label: "Years of Impact" },
              { value: "30", label: "Team Members" },
              { value: "134,554", label: "Happy Customers" },
            ].map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`relative text-center bg-emerald-600 text-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition-all duration-300 ${
                  hoveredStat === index ? "scale-105 shadow-xl" : ""
                }`}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Food Safety Model"
                className="mx-auto h-56 w-56 sm:h-64 sm:w-64 object-cover rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-center mt-4 text-gray-900">
                Food Safety Model
              </h3>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Ensuring safe, chemical-free food through rigorous sourcing,
                  processing, and delivery standards, prioritizing health and
                  trust.
                </p>
              </div>
              <div className="bg-teal-500 text-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  Creating a transparent, sustainable food ecosystem that
                  connects farmers and consumers with dignity and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Food Endeavor */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Safe Food Endeavor
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Shondhi delivers safe, high-quality food through direct sourcing,
              sustainable packaging, and rigorous quality control.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {[
              {
                icon: FiShield,
                title: "Safe Food",
                desc: "Uncompromising quality and safety in every product.",
              },
              {
                icon: FiLeaf,
                title: "Natural Preservation",
                desc: "Chemical-free preservation for pure flavors.",
              },
              {
                icon: FiUsers,
                title: "Eco-Friendly Packaging",
                desc: "Sustainable materials for a greener future.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-gray-100 p-6 rounded-2xl shadow-sm transform hover:-translate-y-2 transition-all duration-300"
              >
                {item.icon && (
                  <item.icon className="text-2xl sm:text-3xl text-emerald-600 mx-auto mb-4" />
                )}
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            {[
              { value: "99", label: "Registered Collectors" },
              { value: "2", label: "Community Centers" },
              { value: "7", label: "Years in Operation" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Farmers */}
      <section className="py-16 sm:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Community Farmers
              </h2>
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-600 mb-4">
                Trusted Partnerships
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-md sm:max-w-lg">
                We partner with small-scale farmers to ensure quality and
                fairness, delivering fresh, organic products directly to you.
              </p>
              <Link
                href="/our-artisan"
                className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300"
              >
                Meet Our Farmers
                <FiArrowRight className="ml-2 text-lg" />
              </Link>
            </div>
            <div>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmer in field"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Novelty */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-emerald-500 text-white p-6 sm:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                What Sets Us Apart
              </h2>
              <ul className="space-y-3">
                {[
                  "Safe, chemical-free food",
                  "Natural preservation techniques",
                  "Wide variety of organic cereals",
                  "Direct farm-to-table delivery",
                  "Fair pricing for farmers",
                  "Eco-friendly packaging with organic materials",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-lg sm:text-xl mr-3">•</span>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Our products"
                className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Packaging"
                className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
