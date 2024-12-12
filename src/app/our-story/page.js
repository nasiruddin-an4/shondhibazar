"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Award, Globe, Lightbulb, Users } from "lucide-react";
import Image from "next/image";

const OurStory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const timelineEvents = [
    {
      year: 2010,
      title: "The Beginning",
      description:
        "Our company was founded with a vision to revolutionize the industry.",
      icon: Lightbulb,
    },
    {
      year: 2015,
      title: "Expansion",
      description:
        "We expanded our operations to three new countries, reaching millions of new customers.",
      icon: Globe,
    },
    {
      year: 2018,
      title: "Innovation Award",
      description:
        "Our groundbreaking product won the prestigious Industry Innovation Award.",
      icon: Award,
    },
    {
      year: 2023,
      title: "Sustainability Initiative",
      description:
        "We launched our comprehensive sustainability program, aiming for carbon neutrality by 2030.",
      icon: Users,
    },
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible.",
      icon: Lightbulb,
    },
    {
      title: "Integrity",
      description:
        "We conduct our business with the highest ethical standards.",
      icon: Award,
    },
    {
      title: "Sustainability",
      description:
        "We're committed to protecting our planet for future generations.",
      icon: Globe,
    },
    {
      title: "Customer-Centric",
      description: "Our customers are at the heart of everything we do.",
      icon: Users,
    },
  ];

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-screen bg-gray-300" />
      <div className="max-w-4xl mx-auto py-20 px-4 space-y-12">
        <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto" />
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-8">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0" />
              <div className="flex-grow space-y-2">
                <div className="h-6 bg-gray-300 rounded w-1/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/placeholder.svg"
          alt="Our Story Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="z-10 max-w-4xl px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="text-xl md:text-3xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            A journey of passion, innovation, and growth
          </motion.p>
          <motion.button
            className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Journey
          </motion.button>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <ChevronDown className="w-12 h-12 text-white" />
        </motion.div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-green-500"
            {...fadeInUp}
          >
            Our Journey Through Time
          </motion.h2>
          <motion.div
            className="space-y-16"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                className="flex flex-col md:flex-row items-center md:items-start"
                variants={fadeInUp}
              >
                <div className="flex-shrink-0 w-32 h-32 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl font-bold mb-6 md:mb-0 md:mr-12">
                  {event.year}
                </div>
                <div className="md:pt-4">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <event.icon className="w-8 h-8 mr-3 text-green-500" />
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-green-500"
            {...fadeInUp}
          >
            Our Core Values
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <value.icon className="w-12 h-12 text-green-500 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-green-500">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-lg">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center bg-green-500 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            {...fadeInUp}
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p className="text-xl mb-12" variants={fadeInUp}>
            Be part of our story as we continue to grow and make a difference.
          </motion.p>
          <motion.button
            className="bg-white text-green-500 px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
