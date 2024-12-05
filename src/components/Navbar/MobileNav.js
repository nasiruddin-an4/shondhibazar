// components/layout/MobileNav.js
"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const MobileNav = ({ onOpenCart, onOpenMenu }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOpenMenu}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </motion.button>

        <div className="flex-1 flex justify-center">
          <Image
            src="/images/logo2.png"
            alt="ShondhiBazar"
            width={120}
            height={40}
            className="h-12 w-auto"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCart}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg group"
        >
          <span className="text-gray-900 group-hover:text-green-600 transition-colors">
            2,250.00৳
          </span>
          <ShoppingCart
            size={20}
            className="group-hover:text-green-600 transition-colors"
          />
        </motion.button>
      </div>
    </div>
  );
};

export default MobileNav;
