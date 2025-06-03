"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Play,
  Check,
  Star,
  Users,
  Leaf,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import TrustSections from "@/components/Home/TrustSections/TrustSections";

export default function FreshHarvestRedesign() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      number: "3,500+",
      label: "Happy Families",
      description: "Trust our quality daily",
    },
    {
      number: "100+",
      label: "Partner Farms",
      description: "Certified organic growers",
    },
    {
      number: "250+",
      label: "Fresh Products",
      description: "Available varieties",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Farm-Fresh Safety",
      description:
        "Comprehensive safety testing from certified organic farms with zero-compromise standards.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Advanced Preservation",
      description:
        "Natural preservation technology maintains peak freshness without harmful chemicals.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Smart Packaging",
      description:
        "100% biodegradable packaging that protects food while preserving our planet.",
    },
  ];

  const novelties = [
    "Fresh Food delivery within 24 hours",
    "Advanced Preservation technology",
    "Direct sourcing from verified organic farms",
    "Continuous Monitoring food Supply and dry practices",
    "Adherence during food logistics to cold plan",
    "End-to-end efforts for continuous quality and integration",
    "Recommend our food delivery by traceability measures",
    "BIS & FSSAI Approved",
    "Eco-friendly packaging using zero plastic materials",
    "Product knowledge and nutritional guidance",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-teal-50"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-green-400 rounded-full animate-pulse`}
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 mb-8">
            <Leaf className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-green-700 font-medium text-sm">
              From Farm to Your Table
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
            <span className="block text-gray-900 mb-2">Fresh & Safe</span>
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              Organic Foods
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience pure flavors from trusted growers who share our passion
            for sustainable agriculture and premium quality produce.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center">
              Explore Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white text-gray-800 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border border-gray-200 flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Story
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
                <span className="text-green-700 font-semibold text-sm">
                  🌱 Our Mission
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                A Safe Food
                <span className="block text-green-600">Revolution</span>
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  We're pioneering a new era of food safety and quality,
                  connecting conscious consumers with farmers who share our
                  unwavering commitment to excellence.
                </p>
                <p>
                  Every product undergoes rigorous quality assurance, ensuring
                  what reaches your family represents the pinnacle of
                  agricultural craftsmanship.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">
                  Trusted by 3,500+ families
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Premium Certified
                </h3>
                <p className="text-gray-600">
                  Quality guaranteed at every step
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="products" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-green-400">FreshHarvest</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've reimagined every aspect of the food supply chain for
              unmatched quality and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Novelty Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Our Novelty
              </h2>
              <div className="grid gap-4">
                {novelties.map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:bg-orange-600 transition-colors" />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Quality Assurance",
                  desc: "Rigorous testing and quality checks before reaching your doorstep.",
                },
                {
                  title: "Sustainable Practices",
                  desc: "Environmentally friendly farming methods and sustainable agriculture.",
                },
                {
                  title: "Community Impact",
                  desc: "Supporting local farmers and contributing to community development.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section id="farmers" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-12 text-center h-96 flex items-center justify-center">
                <div>
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Community Unity
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Farmers & Families Together
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full mb-6">
                <span className="text-amber-700 font-semibold text-sm">
                  🤝 Our Community
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Trusted
                <span className="block text-amber-500">Farm Partners</span>
              </h2>

              <h3 className="text-2xl font-bold text-gray-700 mb-4">
                We work with farmers we know and trust.
              </h3>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                <p>
                  Our carefully curated network represents the finest in
                  sustainable farming. Each farmer is hand-selected for their
                  commitment to organic practices.
                </p>
                <p>
                  These relationships ensure every product meets our
                  uncompromising standards for safety, sustainability, and
                  superior taste.
                </p>
              </div>

              <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center">
                Meet Our Farmers
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Entrepreneur
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded by passionate individuals who believe in safe,
                  sustainable food systems. Our journey began with a vision to
                  connect consumers with trusted farmers.
                </p>
                <p>
                  Through innovation and deep agricultural understanding, we've
                  built a platform ensuring every meal is delicious, safe, and
                  sustainably sourced.
                </p>
              </div>
              <button className="mt-8 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Read More
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://shondhibazar.com/wp-content/uploads/2022/07/jesmin-akter.svg"
                    alt="Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-800">Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustSections />
      {/* Certifications */}
      {/* <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Certifications & Trust
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Certification {i + 1}
                </h3>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Brands That Trust Us
              </h3>
              <div className="grid md:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Our Marketplaces
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-8 bg-gray-100 rounded mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the difference of truly fresh, safe, and sustainable
            food. Join thousands who trust us daily.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
            Start Shopping Today
          </button>
        </div>
      </section> */}
    </div>
  );
}
