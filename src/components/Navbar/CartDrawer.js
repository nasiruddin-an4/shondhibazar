"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
} from "@/redux/API_Slices/productSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.products.cart);
  const products = useSelector((state) => state.products.products);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Helper function to find product details
  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId);
  };

  // Handle quantity change
  const handleQuantityChange = (item, change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    dispatch(
      updateCartQuantity({
        productId: item.productId,
        size: item.size,
        quantity: newQuantity,
      })
    );
  };

  // Handle item removal
  const handleRemoveItem = (item) => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        size: item.size,
      })
    );
  };
  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      Your cart is empty
                    </div>
                  ) : (
                    cart.map((item) => {
                      const product = getProductDetails(item.productId);
                      return (
                        <div
                          key={`${item.productId}-${item.size}`}
                          className="flex items-center justify-between border-b pb-4"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">
                                {product.name} - {item.size}
                              </p>
                              <p className="text-green-600">
                                {(item.price * item.quantity).toFixed(2)}৳
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {/* Delete Button */}
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-gray-100 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-50 rounded-lg">
                              <button
                                className="p-1 hover:bg-gray-100 rounded-l-lg text-gray-500 hover:text-gray-700"
                                onClick={() => handleQuantityChange(item, -1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="p-1 hover:bg-gray-100 rounded-r-lg text-gray-500 hover:text-gray-700"
                                onClick={() => handleQuantityChange(item, 1)}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="text-green-600 font-semibold">
                    {cartTotal.toFixed(2)}৳
                  </span>
                </div>
                {cart.length === 0 ? (
                  // Disabled button when cart is empty
                  <button
                    className="w-full py-3 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    Checkout
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckout()}
                    className="w-full py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
