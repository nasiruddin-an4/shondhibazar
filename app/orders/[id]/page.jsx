"use client";
import { useState, use } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import Loader from "@/components/Checkout/Loader";
import AuthModal from "@/components/Auth/AuthModal";
import { useGetOrderByIdQuery } from "@/redux/API_Query/ecommerceApi";
import {
  Lock,
  Check,
  XCircle,
  ArrowLeft,
  Package,
  ClipboardList,
  Truck,
  Home,
  Box,
  MapPin,
  Wallet,
  ShoppingBag,
} from "lucide-react";

function titleCase(s) {
  if (!s) return "";
  return s.charAt(0) + s.slice(1).toLowerCase();
}

function formatCurrency(n) {
  return `৳${Number(n).toFixed(2)}`;
}

const STEPS = [
  { key: "PENDING", label: "Order placed", icon: ClipboardList },
  { key: "CONFIRMED", label: "Confirmed", icon: Check },
  { key: "PROCESSING", label: "Packed", icon: Box },
  { key: "SHIPPED", label: "Out for delivery", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: Home },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TrackingTimeline({ status }) {
  if (status === "CANCELLED" || status === "RETURNED") {
    return (
      <div className="flex items-center gap-3 text-red-600 bg-red-50 rounded-xl p-4">
        <XCircle className="w-6 h-6 shrink-0" />
        <span className="font-medium">This order was {status.toLowerCase()}.</span>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="relative pl-2">
      <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gray-100" />
      {STEPS.map((step, idx) => {
        const done = currentIndex >= 0 && idx <= currentIndex;
        const Icon = step.icon;
        return (
          <div key={step.key} className="flex items-center gap-4 py-3 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                done ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "bg-gray-100 text-gray-400"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className={`font-semibold ${done ? "text-gray-900" : "text-gray-400"}`}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function OrderDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(!isSignedIn);
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id, { skip: !isSignedIn });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Log in to see this order</h2>
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
          >
            Login to Continue
          </button>
        </motion.div>
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-12 h-12 text-emerald-600" />
      </div>
    );

  if (isError || !order)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Order not found</h2>
          <button onClick={() => router.push("/orders")} className="text-emerald-600 font-semibold hover:underline">
            Back to orders
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <Link href="/orders" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </Link>

        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
          {/* Header card */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{order.order_number}</p>
                  <p className="text-sm text-gray-400">Placed {new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(order.total)}</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Tracking</h3>
            <TrackingTimeline status={order.status} />
          </div>

          {/* Items */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-gray-100 p-8">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Items</h3>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center shrink-0">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.product_name || "Product"}</p>
                      <p className="text-sm text-gray-400">{item.quantity} × {formatCurrency(item.unit_price)}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{formatCurrency(item.subtotal)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping address */}
          {order.address && (
            <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-gray-100 p-8">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Shipping Address
              </h3>
              <p className="font-semibold text-gray-900">{order.address.full_name} · {order.address.phone}</p>
              <p className="text-gray-500 mt-1">
                {order.address.address}{order.address.city ? `, ${order.address.city}` : ""}
              </p>
            </div>
          )}

          {/* Payments */}
          {order.payments?.length > 0 && (
            <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-gray-100 p-8">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-500" />
                Payment
              </h3>
              {order.payments.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{titleCase(p.method)}{p.transaction_reference ? ` · ${p.transaction_reference}` : ""}</span>
                  <span className={`font-semibold px-2.5 py-1 rounded-full text-xs ${
                    p.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" : p.status === "FAILED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {titleCase(p.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
