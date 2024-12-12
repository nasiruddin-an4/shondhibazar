// components/layout/MainNavbar.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { NumberCounter } from "@/lib/NumberCounter";

const menuItems = [
  {
    title: "About Store",
    submenu: ["Our Story", "Contact Us", "Locations"],
  },
  {
    title: "Meat, Fish & Poultry",
    submenu: ["Fresh Fish", "Chicken", "Beef", "Mutton"],
  },
  {
    title: "Rice & Grains",
    submenu: ["Basmati Rice", "Regular Rice", "Pulses"],
  },
  {
    title: "Spices & Hearbs",
    submenu: ["Whole Spices", "Ground Spices", "Fresh Herbs"],
  },
  {
    title: "Sugar & Honey",
    submenu: ["Raw Sugar", "Processed Sugar", "Natural Honey"],
  },
  {
    title: "Oil & Ghee",
    submenu: ["Cooking Oil", "Pure Ghee", "Olive Oil"],
  },
];

const moreItems = ["Beverages", "Snacks", "Personal Care", "Household"];

const CartButton = ({ onOpenCart, cartTotal }) => (
  <motion.button
    whileHover={{ scale: 1.05, color: "#059669" }}
    whileTap={{ scale: 0.95 }}
    onClick={onOpenCart}
    className=" w-32 flex items-center space-x-2 transition-all duration-300 group"
  >
    <p className=" w-24  font-medium group-hover:text-green-600">
      {" "}
      <NumberCounter value={cartTotal} />৳
    </p>
    <ShoppingCart
      size={20}
      className="  group-hover:text-green-600 transition-colors duration-300"
    />
  </motion.button>
);

const MainNavbar = ({ onOpenCart }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hoveredItem, setHoveredItem] = useState();

  const cart = useSelector((state) => state.products.cart);
  const products = useSelector((state) => state.products.products);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={isSticky ? { y: 0 } : {}}
      className={`w-full bg-gray-50 z-50 ${
        isSticky ? "fixed top-0 left-0 shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {isSticky && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/">
                <Image
                  src="/images/logo2.png"
                  alt="ShondhiBazar"
                  width={120}
                  height={40}
                  className="h-12 w-auto"
                />
              </Link>
            </motion.div>
          )}

          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className="flex items-center space-x-1 py-4 cursor-pointer"
                  whileHover={{ color: "#059669" }}
                >
                  <span>{item.title}</span>
                  <ChevronDown size={16} />
                </motion.div>

                {/* Animated underline */}
                <motion.div
                  className="h-0.5 bg-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredItem === item.title ? "100%" : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Submenu */}
                <AnimatePresence>
                  {hoveredItem === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-20 bg-white shadow-lg rounded-lg py-2 w-48"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem}
                          href="/product-category"
                          className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600 transition-colors"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* More+ dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredItem("more")}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                className="flex items-center space-x-1 py-4 cursor-pointer"
                whileHover={{ color: "#059669" }}
              >
                <span>More+</span>
                <ChevronDown size={16} />
              </motion.div>

              <AnimatePresence>
                {hoveredItem === "more" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full z-20 right-0 bg-white shadow-lg rounded-lg py-2 w-48"
                  >
                    {moreItems.map((item) => (
                      <Link
                        key={item}
                        href="/product-category"
                        className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cart with total */}
          {/* <div className="flex items-center space-x-2">
            <ShoppingCart size={20} className="text-green-600" />
            <span className="font-medium">2,250.00৳</span>
          </div> */}
          <CartButton cartTotal={cartTotal} onOpenCart={onOpenCart} />
        </div>
      </div>
    </motion.nav>
  );
};

export default MainNavbar;
