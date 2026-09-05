"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";

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
import CheckoutPhoneOTP from "./CheckoutPhoneOTP";

import { clearCart } from "@/redux/API_Slices/productSlice";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import { calculateShipping, calculateSubtotal } from "@/lib/checkoutUtils";
import {
  usePlaceOrderMutation,
  useInitSSLCommerzPaymentMutation,
  useSendCheckoutOtpMutation,
} from "@/redux/API_Query/ecommerceApi";
import { useRouter } from "next/navigation";

// Compares two phone numbers ignoring formatting differences (spaces, dashes, country code).
function normalizePhone(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits.slice(-10);
}

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState(null);
  const [shippingData, setShippingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [placeOrder] = usePlaceOrderMutation();
  const [initSSLCommerzPayment] = useInitSSLCommerzPaymentMutation();
  const [sendCheckoutOtp] = useSendCheckoutOtpMutation();

  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [pendingDevOtp, setPendingDevOtp] = useState(null);
  const [verifiedPhone, setVerifiedPhone] = useState(null);

  const cartItems = useSelector((state) => state.products.cart);
  const user = useSelector((state) => state.auth?.user);
  const userId = user?.id;
  const subtotal = calculateSubtotal(cartItems);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle the browser landing back here after an SSLCommerz sandbox payment redirect
  useEffect(() => {
    const paymentResult = searchParams?.get("payment");
    const orderNumber = searchParams?.get("order");
    if (paymentResult === "success") {
      setCompletedOrderNumber(orderNumber || null);
      setOrderComplete(true);
      dispatch(clearCart());
    } else if (paymentResult === "failed") {
      setErrorMessage(
        "Payment failed. Your order was saved but not paid — please try again."
      );
    } else if (paymentResult === "cancelled") {
      setErrorMessage(
        "Payment was cancelled. Your order was saved but not paid — please try again."
      );
    }
  }, [searchParams, dispatch]);

  const handleShippingSubmit = async (data) => {
    setShippingData(data);
    setErrorMessage(null);

    const alreadyTrusted =
      (user?.phone_verified && normalizePhone(user.phone) === normalizePhone(data.phone)) ||
      (verifiedPhone && normalizePhone(verifiedPhone) === normalizePhone(data.phone));

    if (alreadyTrusted) {
      setStep(2);
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendCheckoutOtp({ phone: data.phone }).unwrap();
      setPendingDevOtp(res.dev_otp || null);
      setShowPhoneOtp(true);
    } catch (err) {
      setErrorMessage(extractErrorMessage(err, "Failed to send a verification code to that number."));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerified = () => {
    setVerifiedPhone(shippingData.phone);
    setShowPhoneOtp(false);
    setStep(2);
  };

  const handlePaymentSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await processOrder(data.paymentMethod);
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(
        extractErrorMessage(error, "Something went wrong placing your order. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const processOrder = async (paymentMethod) => {
    const order = await placeOrder({
      source: "ECOMMERCE",
      user_id: userId || undefined,
      subtotal,
      shipping_fee: shipping,
      total,
      items: cartItems.map((item) => ({
        product_variant_id: item.variantId,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
      })),
      address: {
        full_name: shippingData.fullName,
        phone: shippingData.phone,
        email: shippingData.email,
        address: shippingData.address,
        city: shippingData.city,
        postal_code: shippingData.postalCode,
      },
    }).unwrap();

    if (paymentMethod === "online") {
      const session = await initSSLCommerzPayment({
        order_id: order.id,
      }).unwrap();
      dispatch(clearCart());
      window.location.href = session.gateway_url;
      return; // leaving the SPA for the gateway's hosted checkout page
    }

    // Cash on Delivery: nothing more to do here, staff record the payment on delivery.
    setCompletedOrderNumber(order.order_number);
    setOrderComplete(true);
    dispatch(clearCart());
  };

  if (orderComplete) {
    return (
      <OrderSuccess
        orderNumber={completedOrderNumber}
        onContinueShopping={() => router.push("/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
          <StepIndicator currentStep={step} />
        </div>

        {errorMessage && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm flex-1">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back Button */}
            {!showPhoneOtp && (
              <button
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  } else {
                    router.push("/");
                    setTimeout(() => {
                      window.dispatchEvent(new Event("open-cart"));
                    }, 100);
                  }
                }}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                {step > 1 ? "Back to previous step" : "Continue Shopping"}
              </button>
            )}

            {/* Main Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {step === 1 && showPhoneOtp && (
                <CheckoutPhoneOTP
                  phone={shippingData?.phone}
                  initialDevOtp={pendingDevOtp}
                  onVerified={handlePhoneVerified}
                  onBack={() => setShowPhoneOtp(false)}
                />
              )}

              {step === 1 && !showPhoneOtp && (
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
