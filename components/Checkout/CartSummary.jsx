"use client";
import React from "react";
import { ChevronRight, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/checkoutUtils";
import { useSelector } from "react-redux";

const CartItemSkeleton = () => (
  <div className="flex gap-4 p-4 bg-white rounded-lg">
    {/* Image skeleton */}
    <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
    {/* Content skeleton */}
    <div className="flex-1 space-y-2">
      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
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
    <div className="flex gap-3 p-3 bg-white rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-xs text-gray-500">
          {item.size} × {item.quantity}
        </p>
        <p className="text-sm font-medium text-green-600 mt-0.5">
          {formatCurrency(item.price * item.quantity)}
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
  step,
  onContinue,
}) => {
  const cartItems = useSelector((state) => state.products.cart);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

      <div className="space-y-1 mb-6">
        {isLoading
          ? // Simple skeleton loader
            [...Array(2)].map((_, i) => <CartItemSkeleton key={i} />)
          : // Actual items
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} isLoading={false} />
            ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          {isLoading ? (
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span>{formatCurrency(subtotal)}</span>
          )}
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {isLoading ? (
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
          ) : (
            <span>{formatCurrency(shipping)}</span>
          )}
        </div>

        {/* Total */}
        <div className="border-t pt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            {isLoading ? (
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            ) : (
              <span>{formatCurrency(total)}</span>
            )}
          </div>
        </div>
      </div>

      {step === 1 && (
        <button
          onClick={onContinue}
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-medium 
                   hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          Continue to Payment
          <ChevronRight size={20} />
        </button>
      )}

      {subtotal < 1000 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <AlertCircle size={16} className="text-green-500" />
          <span>
            Add {formatCurrency(1000 - subtotal)} more for free shipping
          </span>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
