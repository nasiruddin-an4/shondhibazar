// components/layout/MobileMenuDrawer.js
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const MobileMenuDrawer = ({ isOpen, onClose }) => {
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
                          href="#"
                          className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
                          onClick={onClose}
                        >
                          {subItem}
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
