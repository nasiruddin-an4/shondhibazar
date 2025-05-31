"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const aboutStoreItems = [
  { title: "About Shondibazar", link: "/about/" },
  { title: "From Your Groewer ", link: "/about/home-of-safe-food" },
  { title: "Our Packging ", link: "/about/packaging" },
  { title: "Our Artisan ", link: "/about/artisan" },
  { title: "Our Safe Food ", link: "/about/safe-food" },
  { title: "Founder's Story ", link: "/about/jesmin-akhtar-neela/" },
  { title: "FAQ ", link: "/about/faq" },
  // { title: "Our Story", link: "/about/our-story" },
  // { title: "Contact Us", link: "/about/contact-us" },
  // { title: "Locations", link: "/about/locations" },
];

const TopNavbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between space-x-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="ShondhiBazar"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* About Store Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredItem("about")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                className="flex items-center space-x-1 cursor-pointer"
                whileHover={{ color: "#059669" }}
              >
                <span>About Store</span>
                <ChevronDown size={16} />
              </motion.div>

              {/* Animated underline */}
              <motion.div
                className="h-0.5 bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: hoveredItem === "about" ? "100%" : 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Submenu */}
              <AnimatePresence>
                {hoveredItem === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 z-20 bg-white shadow-lg rounded-lg py-2 w-48"
                  >
                    {aboutStoreItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.link}
                        className="block text-sm px-4 py-1 hover:bg-gray-50 hover:text-green-600 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-gray-300" />
            <Link
              href="/buying-guide"
              className="hover:text-green-600 transition-colors"
            >
              Buying Guide
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <Link
              href="/faqs"
              className="hover:text-green-600 transition-colors"
            >
              FAQs
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <Link
              href="/refund-policy"
              className="hover:text-green-600 transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
