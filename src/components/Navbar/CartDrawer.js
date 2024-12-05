// components/layout/CartDrawer.js
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";

const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src="/product-image.jpg"
                        alt="Product"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">
                          জিঙ্ক সমৃদ্ধ চাল(২৫ কেজি) [Zink Rice] - 25 kg
                        </p>
                        <p className="text-green-600">2,250.00৳</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Minus size={16} />
                      </button>
                      <span>1</span>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="text-green-600 font-semibold">
                    2,250.00৳
                  </span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
