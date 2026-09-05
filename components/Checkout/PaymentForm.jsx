"use client";
import React, { useState } from "react";
import { ChevronRight, CreditCard, Wallet } from "lucide-react";
import Loader from "./Loader";

const PaymentForm = ({ onSubmit, isLoading }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive your order",
      icon: Wallet,
    },
    {
      id: "online",
      name: "Online Payment",
      description: "Pay securely by card, bKash, Nagad, Rocket or internet banking",
      icon: CreditCard,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
                ${
                  paymentMethod === method.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-200"
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-green-500"
                disabled={isLoading}
              />
              <div className="flex items-center gap-3 flex-1">
                <Icon
                  className={`w-6 h-6 ${
                    paymentMethod === method.id
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                />
                <div>
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-gray-500">
                    {method.description}
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {paymentMethod === "online" && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            After placing the order, you'll be redirected to our payment
            partner to complete your payment.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium 
                 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Place Order
            <ChevronRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
