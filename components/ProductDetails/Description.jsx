import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

// Skeleton loader component
const DescriptionSkeleton = () => (
  <div className="prose max-w-none animate-pulse">
    <div className="space-y-6">
      {/* Description Section Skeleton */}
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Features Section Skeleton */}
      <div>
        <div className="h-7 w-32 bg-gray-200 rounded mb-3" />
        <div className="space-y-2 pl-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-200" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Section Skeleton */}
      <div>
        <div className="h-7 w-32 bg-gray-200 rounded mb-3" />
        <div className="space-y-2 pl-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-200" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Description = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DescriptionSkeleton />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="prose max-w-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        <motion.div variants={sectionVariants}>
          <motion.h3
            variants={itemVariants}
            className="text-xl font-semibold mb-4"
          >
            পণ্যের বিবরণ
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 whitespace-pre-line mb-6"
          >
            {product.description || "No description available for this product yet."}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Description;
