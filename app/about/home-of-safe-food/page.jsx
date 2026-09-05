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
  CheckCircle2,
  Heart,
  Droplets,
  Sprout
} from "lucide-react";
import TrustSections from "@/components/Home/TrustSections/TrustSections";
import Link from "next/link";

export default function FreshHarvestRedesign() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      number: "3,500+",
      label: "Happy Families",
      description: "Trust our quality daily",
      icon: Heart
    },
    {
      number: "100+",
      label: "Partner Farms",
      description: "Certified organic growers",
      icon: Users
    },
    {
      number: "250+",
      label: "Fresh Products",
      description: "Available varieties",
      icon: Sprout
    },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Farm-Fresh Safety",
      description:
        "Comprehensive safety testing from certified organic farms with zero-compromise standards.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Advanced Preservation",
      description:
        "Natural preservation technology maintains peak freshness without harmful chemicals.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
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
    <div className="min-h-screen bg-gray-50 font-sans pb-24">

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800"
      >
        {/* Floating elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-900/40 rounded-full blur-3xl pointer-events-none transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-24 pb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-sm">
            <Leaf className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-50 font-medium text-sm tracking-wider uppercase">
              From Farm to Your Table
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight text-white">
            <span className="block mb-2">Fresh & Safe</span>
            <span className="text-emerald-200">
              Organic Foods
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-emerald-50/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience pure flavors from trusted growers who share our passion
            for sustainable agriculture and premium quality produce.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/product-category">
              <button className="group bg-white text-teal-800 px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1 inline-flex items-center w-full sm:w-auto justify-center">
                Explore Products
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-sm font-medium tracking-widest uppercase">Discover</span>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-16 px-6 max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group pt-6 md:pt-0 first:pt-0"
              >
                <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <stat.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold text-emerald-700 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-500 font-medium">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-100 rounded-full mb-8">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-bold text-sm tracking-wider uppercase">
                  Our Mission
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                A Safe Food
                <span className="block text-emerald-600 mt-2">Revolution</span>
              </h2>

              <div className="space-y-6 text-xl text-gray-600 leading-relaxed mb-12">
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

              <div className="flex items-center gap-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 inline-flex">
                <div className="flex -space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white font-bold"
                    >
                      <Droplets className="w-6 h-6" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3,500+</div>
                  <div className="text-gray-500 font-medium">Families Trust Us</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-emerald-200/50 rounded-[4rem] transform rotate-6 scale-105"></div>
              <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-16 text-center text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-inner">
                    <Check className="w-16 h-16 text-emerald-100" />
                  </div>
                  <h3 className="text-4xl font-extrabold mb-4 tracking-tight">
                    Premium Certified
                  </h3>
                  <p className="text-emerald-100 text-xl font-medium">
                    Quality guaranteed at every single step of the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="products" className="py-32 px-6 bg-gray-900 text-white rounded-[4rem] mx-4 md:mx-10 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Why Choose <span className="text-emerald-400">Shondhibazar</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We've reimagined every aspect of the food supply chain for
              unmatched quality and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 shadow-xl"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Novelty Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              {[
                {
                  title: "Quality Assurance",
                  desc: "Rigorous testing and quality checks before reaching your doorstep.",
                  icon: Shield
                },
                {
                  title: "Sustainable Practices",
                  desc: "Environmentally friendly farming methods and sustainable agriculture.",
                  icon: Leaf
                },
                {
                  title: "Community Impact",
                  desc: "Supporting local farmers and contributing to community development.",
                  icon: Users
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all flex gap-6 items-start group"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-10 tracking-tight">
                Our <span className="text-emerald-600">Novelty</span>
              </h2>
              <div className="grid gap-5 bg-emerald-50/50 p-8 rounded-[3rem] border border-emerald-100">
                {novelties.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-lg text-gray-800 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section id="farmers" className="py-32 px-6 bg-emerald-900 text-white rounded-[4rem] mx-4 md:mx-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://shondhibazar.com/wp-content/uploads/2025/05/Award-Winning-Moments-499x374.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800/80 backdrop-blur-md rounded-full mb-8 border border-emerald-700">
                <Users className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-100 font-bold text-sm tracking-wider uppercase">
                  Our Community
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Trusted
                <span className="block text-emerald-400 mt-2">Farm Partners</span>
              </h2>

              <h3 className="text-2xl font-semibold text-emerald-100 mb-8">
                We work with farmers we know and trust.
              </h3>

              <div className="space-y-6 text-xl text-emerald-50/80 leading-relaxed mb-12">
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

              <Link href="/about/jesmin-akhtar-neela">
                <button className="group bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/50 transform hover:-translate-y-1 inline-flex items-center">
                  Meet Our Farmers
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 text-center border border-white/20 shadow-2xl">
                <div className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-300/30">
                  <Heart className="w-20 h-20 text-white" />
                </div>
                <h3 className="text-4xl font-extrabold tracking-tight mb-4">
                  Community Unity
                </h3>
                <p className="text-xl text-emerald-100 font-medium">
                  Farmers & Families Growing Together
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Entrepreneur Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Our Visionary
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">The driving force behind our safe food revolution.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-[4rem] transform -rotate-3 scale-105"></div>
              <div className="relative bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100 text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8 ring-8 ring-emerald-50 shadow-2xl">
                  <img
                    src="https://shondhibazar.com/wp-content/uploads/2022/07/jesmin-akter.svg"
                    alt="Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Jesmin Akhtar Neela</h3>
                <p className="font-bold text-emerald-600 text-lg uppercase tracking-wider">Founder & CEO</p>
              </div>
            </div>

            <div>
              <div className="space-y-8 text-xl text-gray-600 leading-relaxed mb-12">
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
              <Link href="/about/jesmin-akhtar-neela">
                <button className="bg-gray-900 hover:bg-emerald-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-3">
                  Read Her Full Story
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
      
      <div className="pb-12">
        <TrustSections />
      </div>
    </div>
  );
}
