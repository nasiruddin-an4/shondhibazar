"use client";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
} from "@/redux/API_Slices/productSlice";
import { useRouter } from "next/navigation";
import { calculateShipping, calculateSubtotal, calculateDiscount } from "@/lib/checkoutUtils";
import PromoCodeField from "@/components/Checkout/PromoCodeField";

const money = (amount) => `${amount.toFixed(2)}৳`;

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.products.cart);
  const products = useSelector((state) => state.products.products);
  const coupon = useSelector((state) => state.products.coupon);

  const cartTotal = calculateSubtotal(cart);
  const shipping = cart.length > 0 ? calculateShipping(cartTotal) : 0;
  const discount = calculateDiscount(coupon, cartTotal);
  const total = cartTotal + shipping - discount;

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
        variantId: item.variantId,
        quantity: newQuantity,
      })
    );
  };

  // Handle item removal
  const handleRemoveItem = (item) => {
    dispatch(
      removeFromCart({
        productId: item.productId,
        variantId: item.variantId,
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
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-50 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
              <button
                onClick={onClose}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-16">
                  <ShoppingBag size={40} className="mb-3 text-gray-300" />
                  <p className="text-gray-600 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Add items to see them here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => {
                    const product = getProductDetails(item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={`${item.productId}-${item.variantId}`}
                        className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.size}</p>
                          <p className="text-sm font-bold text-green-600 mt-0.5">
                            {money(item.price * item.quantity)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => handleRemoveItem(item)}
                            aria-label="Remove item"
                            className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-1">
                            <button
                              className="h-6 w-6 flex items-center justify-center text-gray-600 disabled:opacity-30"
                              onClick={() => handleQuantityChange(item, -1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="h-6 w-6 flex items-center justify-center text-gray-600"
                              onClick={() => handleQuantityChange(item, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Summary + CTA */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-gray-100 px-5 py-4 shrink-0 space-y-3">
                <PromoCodeField subtotal={cartTotal} />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{money(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping Fee</span>
                    <span>{shipping === 0 ? "Free" : money(shipping)}</span>
                  </div>
                  {coupon && discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-{money(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-3 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
