"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

// Skeleton loader component
const AdditionalSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Information Skeleton */}
      <div>
        <div className="h-7 w-48 bg-gray-200 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Nutritional Information Skeleton */}
      <div>
        <div className="h-7 w-48 bg-gray-200 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Additional = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AdditionalSkeleton />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Information */}
        <motion.div variants={itemVariants}>
          <motion.h3
            variants={itemVariants}
            className="font-semibold text-lg mb-4"
          >
            Product Information
          </motion.h3>
          <table className="w-full">
            <tbody className="divide-y">
              {[
                { label: "Weight", value: "1kg, 5kg, 25kg" },
                { label: "Category", value: product.category },
                { label: "SKU", value: "RICE001" },
                { label: "Storage", value: "Keep in a cool, dry place" },
              ].map((item, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-3 text-gray-600">{item.label}</td>
                  <td className="py-3 font-medium">{item.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Nutritional Information */}
        <motion.div variants={itemVariants}>
          <motion.h3
            variants={itemVariants}
            className="font-semibold text-lg mb-4"
          >
            Nutritional Information
          </motion.h3>
          <table className="w-full">
            <tbody className="divide-y">
              {[
                { label: "জলীয় অংশ", value: "১২.৬০ গ্রাম" },
                { label: "আমিষ", value: "৩৯.৪ গ্রাম" },
                { label: "শ্বাসকৃত", value: "৫৯৬ গ্রাম" },
                { label: "আঁশ", value: "১৮.৫ গ্রাম" },
                { label: "চর্বি", value: "০.৬ গ্রাম" },
                { label: "শর্করা", value: "৭৭.৪ গ্রাম" },
              ].map((item, index) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-3 text-gray-600">{item.label}</td>
                  <td className="py-3 font-medium">{item.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Additional;
