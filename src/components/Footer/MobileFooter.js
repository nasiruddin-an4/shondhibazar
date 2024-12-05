// components/layout/MobileFooter.js
"use client";
import Link from "next/link";
import { Search, Home, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";

const MobileFooter = () => {
  const footerItems = [
    { icon: <Search size={20} />, label: "Search", href: "/search" },
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <ShoppingCart size={20} />, label: "Cart", href: "/cart" },
    { icon: <User size={20} />, label: "Account", href: "/account" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top z-40 border-t">
      <div className="grid grid-cols-4 gap-1">
        {footerItems.map((item, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            className="text-center py-2"
          >
            <Link href={item.href}>
              <div className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors">
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileFooter;
