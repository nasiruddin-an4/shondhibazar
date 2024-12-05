// components/layout/TopNavbar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const TopNavbar = () => {
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
