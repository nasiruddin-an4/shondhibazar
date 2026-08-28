"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Loader,
  Check,
  Clock,
  Shield,
  ArrowLeft,
  Package,
  AlertCircle,
  X,
} from "lucide-react";

// Components
import StepIndicator from "./StepIndicator";
import CartSummary from "./CartSummary";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import OrderSuccess from "./OrderSuccess";

import { clearCart } from "@/redux/API_Slices/productSlice";
import { calculateShipping, calculateSubtotal } from "@/lib/checkoutUtils";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  //   const cartItems = useSelector((state) => state.products.cart);
  const cartItems = useSelector((state) => state.products.cart);
  const subtotal = calculateSubtotal(cartItems);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  console.log("cartItems", cartItems);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  //   useEffect(() => {
  //     if (cartItems.length === 0 && !orderComplete) {
  //       router.push("/cart");
  //     }
  //   }, [cartItems, router, orderComplete]);

  const handleShippingSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShippingData(data);
      setStep(2);
    } catch (error) {
      console.error("Shipping submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentData(data);
      // Process order
      await processOrder();
      setOrderComplete(true);
      dispatch(clearCart());
    } catch (error) {
      console.error("Payment submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processOrder = async () => {
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Here you would typically make an API call to create the order
    const orderData = {
      items: cartItems,
      shipping: shippingData,
      payment: paymentData,
      totals: {
        subtotal,
        shipping,
        total,
      },
    };
    console.log("Processing order:", orderData);
  };

  if (orderComplete) {
    return <OrderSuccess onContinueShopping={() => router.push("/")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
          <StepIndicator currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back Button */}
            <button
              onClick={() =>
                step > 1 ? setStep(step - 1) : router.push("/cart")
              }
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              {step > 1 ? "Back to previous step" : "Back to cart"}
            </button>

            {/* Main Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {step === 1 && (
                <ShippingForm
                  onSubmit={handleShippingSubmit}
                  initialData={shippingData}
                  isLoading={isLoading}
                />
              )}

              {step === 2 && (
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { Icon: Shield, label: "Secure Payment" },
                { Icon: Truck, label: "Free Delivery Over ৳1000" },
                { Icon: Clock, label: "Fast Shipping" },
                { Icon: Package, label: "Easy Returns" },
              ].map(({ Icon, label }, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              isLoading={isLoading}
              step={step}
              onContinue={() => setStep(2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
