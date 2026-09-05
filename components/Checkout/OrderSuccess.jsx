"use client";

import React from "react";
import { Check, Package } from "lucide-react";

const OrderSuccess = ({ orderNumber, onContinueShopping }) => {
  const displayOrderNumber = orderNumber || "N/A";

  // persist a lightweight local record so the (mock) /orders page can list it
  React.useEffect(() => {
    try {
      const order = {
        id: displayOrderNumber,
        date: new Date().toISOString(),
        status: "Processing",
      };
      const raw = localStorage.getItem("sb_orders");
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(order);
      localStorage.setItem("sb_orders", JSON.stringify(list));
    } catch (err) {}
  }, [displayOrderNumber]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Your order has been placed successfully. We'll send you a
            confirmation email shortly with your order details.
          </p>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg inline-block">
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="w-5 h-5" />
              <span>Order #: {displayOrderNumber}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/orders")}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Track Your Order
            </button>
            <button
              onClick={onContinueShopping}
              className="px-6 py-3 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
