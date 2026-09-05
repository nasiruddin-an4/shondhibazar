"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

// Skeleton loader component
const AdditionalSkeleton = () => (
  <div className="space-y-6 animate-pulse max-w-md">
    <div className="h-7 w-48 bg-gray-200 rounded mb-4" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      ))}
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

  const infoRows = [
    { label: "Weight", value: product.sizes.map((s) => s.size).join(", ") },
    { label: "Category", value: product.category },
    { label: "SKU", value: product.sizes.map((s) => s.sku).filter(Boolean).join(", ") || "N/A" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <motion.h3
          variants={itemVariants}
          className="font-semibold text-lg mb-4"
        >
          Product Information
        </motion.h3>
        <table className="w-full max-w-md">
          <tbody className="divide-y">
            {infoRows.map((item, index) => (
              <motion.tr
                key={item.label}
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
    </motion.div>
  );
};

export default Additional;
