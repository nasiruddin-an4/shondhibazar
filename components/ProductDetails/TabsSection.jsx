"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Description from "./Description";
import Additional from "./Additional";
import Reviews from "./Reviews/Reviews";
const TabsSkeleton = () => (
  <div className="mb-16 animate-pulse">
    <div className="border-b mb-8">
      <div className="flex space-x-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-32 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
    <div className="bg-white rounded-lg p-6 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full" />
      ))}
    </div>
  </div>
);

// Updated Tabs Section with animations
const TabsSection = ({
  product,
  activeTab,
  setActiveTab,
  reviews,
  reviewsLoading,
  isLoading,
}) => {
  // Animation variants for tabs
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Animation variants for the underline
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
    exit: { scaleX: 0 },
  };

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  if (isLoading) {
    return <TabsSkeleton />;
  }

  return (
    <motion.div
      className="mb-[5rem]"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariants}
    >
      {/* Tab Headers */}
      <div className="border-b mb-8 overflow-x-auto overflow-y-hidden ">
        <div className="flex min-w-max space-x-4 sm:space-x-8 px-4 sm:px-0">
          <motion.button
            onClick={() => setActiveTab("description")}
            className={`px-4 sm:px-6 py-4 text-base sm:text-lg font-medium relative transition-colors
                ${
                  activeTab === "description"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Description
            <AnimatePresence>
              {activeTab === "description" && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={underlineVariants}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("additional")}
            className={`px-4 sm:px-6 py-4 text-base sm:text-lg font-medium relative transition-colors
                ${
                  activeTab === "additional"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Additional information
            <AnimatePresence>
              {activeTab === "additional" && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={underlineVariants}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 sm:px-6 py-4 text-base sm:text-lg font-medium relative transition-colors
                ${
                  activeTab === "reviews"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reviews ({reviews?.length || 0})
            <AnimatePresence>
              {activeTab === "reviews" && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={underlineVariants}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg p-6"
        >
          {activeTab === "description" && <Description product={product} />}
          {activeTab === "additional" && <Additional product={product} />}
          {activeTab === "reviews" && (
            <Reviews reviews={reviews} productId={product.id} isLoading={reviewsLoading} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default TabsSection;
