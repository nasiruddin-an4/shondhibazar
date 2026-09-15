"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { calculateDiscount } from "@/lib/checkoutUtils";
import PromoCodeField from "./PromoCodeField";

// Matches the site-wide "455.00৳" convention used on product cards, rather
// than the shared formatCurrency() helper — that one formats BDT with Bengali
// numerals (Intl "bn-BD"), which read as garbled digits next to everything
// else in the app.
const money = (amount) => `${Number(amount).toFixed(2)}৳`;

const CartItemSkeleton = () => (
  <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm">
    <div className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
    </div>
  </div>
);

// Main Cart Item
const CartItem = ({ item, isLoading }) => {
  const products = useSelector((state) => state.products.products);

  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId) || null;
  };

  const product = getProductDetails(item.productId);

  if (isLoading) return <CartItemSkeleton />;

  if (!product) return null;

  return (
    <div className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500">
          {item.size} × {item.quantity}
        </p>
        <p className="text-sm font-bold text-green-600 mt-0.5">
          {money(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

const CartSummary = ({
  subtotal,
  shipping,
  total,
  isLoading,
}) => {
  const cartItems = useSelector((state) => state.products.cart);
  const coupon = useSelector((state) => state.products.coupon);
  const discount = calculateDiscount(coupon, subtotal);

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 sm:p-6 sm:sticky sm:top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3 mb-4">
        {isLoading
          ? // Simple skeleton loader
            [...Array(2)].map((_, i) => <CartItemSkeleton key={i} />)
          : // Actual items
            cartItems.map((item) => (
              <CartItem key={`${item.productId}-${item.variantId}`} item={item} isLoading={false} />
            ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5">
        {/* Promo code — lives right above the price lines it affects, so applying
            it and seeing the discount/total update read as one continuous action
            instead of a separate step before the bill. */}
        {!isLoading && (
          <div className="pb-2.5 border-b border-gray-100">
            <PromoCodeField subtotal={subtotal} />
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          {isLoading ? (
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span>{money(subtotal)}</span>
          )}
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping Fee</span>
          {isLoading ? (
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span>{shipping === 0 ? "Free" : money(shipping)}</span>
          )}
        </div>

        {/* Discount */}
        {!isLoading && coupon && discount > 0 && (
          <div className="flex justify-between text-sm text-green-600 font-medium">
            <span>Discount</span>
            <span>-{money(discount)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between font-bold text-gray-900 pt-2.5 border-t border-gray-100">
          <span>Total</span>
          {isLoading ? (
            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span>{money(total)}</span>
          )}
        </div>
      </div>

      {subtotal < 1000 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 p-3 rounded-xl">
          <AlertCircle size={16} className="text-green-500 shrink-0" />
          <span>
            Add {money(1000 - subtotal)} more for free shipping
          </span>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
