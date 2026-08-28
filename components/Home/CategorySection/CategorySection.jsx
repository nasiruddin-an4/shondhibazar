// components/category/CategorySection.js
"use client";
import Link from "next/link";
import { motion } from "motion/react";

const CategorySection = () => {
  const categories = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            d="M6.5 8.5c0-3.5 2.5-6.5 5.5-6.5s5.5 3 5.5 6.5-2.5 4.5-5.5 4.5-5.5-1-5.5-4.5z"
            strokeWidth="1.5"
          />
          <path d="M4 19.5C4 15 8 13 12 13s8 2 8 6.5" strokeWidth="1.5" />
          <path d="M12 13c-2.4 0-4.5-1-5.5-2.5" strokeWidth="1.5" />
          <path d="M17.5 10.5c-1 1.5-3.1 2.5-5.5 2.5" strokeWidth="1.5" />
        </svg>
      ),
      name: "Rice & Grains",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path d="M8 4v4m8-4v4M6 8h12m-10 4v8m8-8v8M7 20h10" strokeWidth="1.5" />
          <rect x="6" y="8" width="12" height="12" rx="1" strokeWidth="1.5" />
        </svg>
      ),
      name: "Oil & Ghee",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
            strokeWidth="1.5"
          />
          <path
            d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"
            strokeWidth="1.5"
          />
          <path
            d="M12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            strokeWidth="1.5"
          />
        </svg>
      ),
      name: "Herbs & Spice",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path d="M9 8h6m-6 4h6m-6 4h6" strokeWidth="1.5" />
          <rect x="5" y="4" width="14" height="16" rx="2" strokeWidth="1.5" />
        </svg>
      ),
      name: "Honey & Sugar",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <ellipse cx="12" cy="12" rx="8" ry="6" strokeWidth="1.5" />
          <path
            d="M12 6c-2.2 0-4 2.7-4 6s1.8 6 4 6 4-2.7 4-6-1.8-6-4-6z"
            strokeWidth="1.5"
          />
        </svg>
      ),
      name: "Eggs",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path d="M8 14l4-4 4 4" strokeWidth="1.5" />
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
        </svg>
      ),
      name: "Meat & Chicken",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path
            d="M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
            strokeWidth="1.5"
          />
          <path d="M4 12h4m8 0h4M12 4v4m0 8v4" strokeWidth="1.5" />
        </svg>
      ),
      name: "Fish & Dried Fish",
      href: "/product-category",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-full h-full"
        >
          <path d="M7 8h10M7 12h10M7 16h10" strokeWidth="1.5" />
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.5" />
        </svg>
      ),
      name: "Pickles",
      href: "/product-category",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Link href={category.href} className="block group h-full">
                <motion.div
                  className="flex flex-col items-center p-4 bg-white rounded-lg transition-all duration-300 hover:shadow-lg h-full"
                  whileHover={{ y: -5 }}
                >
                  {/* Icon Container */}
                  <div className="w-10 h-10 md:w-12 md:h-12 mb-3 text-gray-600 transition-all duration-300 group-hover:text-green-600 group-hover:scale-110">
                    {category.icon}
                  </div>
                  {/* Category Name */}
                  <span className="text-sm md:text-base text-center font-medium text-gray-800 group-hover:text-green-600">
                    {category.name}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
