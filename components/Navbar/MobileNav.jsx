// components/layout/MobileNav.js
"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { NumberCounter } from "@/lib/NumberCounter";

const MobileNav = ({ onOpenCart, onOpenMenu }) => {
  const cart = useSelector((state) => state.products.cart);
  const products = useSelector((state) => state.products.products);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
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
          className="relative p-2 flex items-center justify-center hover:bg-gray-100 rounded-lg group transition-colors"
        >
          <ShoppingCart
            size={24}
            className="text-gray-900 group-hover:text-green-600 transition-colors"
          />
          {cart.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default MobileNav;
