// components/layout/MobileMenuDrawer.js
"use client";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";

const MobileMenuDrawer = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      title: "About Store",
      submenu: [
        { label: "Our Story", href: "/about/story" },
        { label: "Contact Us", href: "/about/contact-us" },
        { label: "Locations", href: "/about/locations" },
      ],
    },
    {
      title: "Meat, Fish & Poultry",
      submenu: [
        { label: "Fresh Fish", href: "/product-category" },
        { label: "Chicken", href: "/product-category" },
        { label: "Beef", href: "/product-category" },
        { label: "Mutton", href: "/product-category" },
      ],
    },
    {
      title: "Rice & Grains",
      submenu: [
        { label: "Basmati Rice", href: "/product-category" },
        { label: "Regular Rice", href: "/product-category" },
        { label: "Pulses", href: "/product-category" },
      ],
    },
    {
      title: "Spices & Hearbs",
      submenu: [
        { label: "Whole Spices", href: "/product-category" },
        { label: "Ground Spices", href: "/product-category" },
        { label: "Fresh Herbs", href: "/product-category" },
      ],
    },
    {
      title: "Sugar & Honey",
      submenu: [
        { label: "Raw Sugar", href: "/product-category" },
        { label: "Processed Sugar", href: "/product-category" },
        { label: "Natural Honey", href: "/product-category" },
      ],
    },
    {
      title: "Oil & Ghee",
      submenu: [
        { label: "Cooking Oil", href: "/product-category" },
        { label: "Pure Ghee", href: "/product-category" },
        { label: "Olive Oil", href: "/product-category" },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-auto py-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                    <div className="pl-4 space-y-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href="/product-category"
                          className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
