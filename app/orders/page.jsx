"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import Link from "next/link";
import Loader from "@/components/Checkout/Loader";
import AuthModal from "@/components/Auth/AuthModal";
import { useGetUserOrdersQuery } from "@/redux/API_Query/ecommerceApi";
import { Lock, Package, ShoppingBag, ChevronRight, Wallet } from "lucide-react";

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function titleCase(s) {
  if (!s) return "";
  return s.charAt(0) + s.slice(1).toLowerCase();
}

function formatCurrency(n) {
  return `৳${Number(n).toFixed(2)}`;
}

const STATUS_STYLES = {
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
  RETURNED: "bg-red-100 text-red-700",
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
};

function statusBadgeClass(status) {
  return STATUS_STYLES[status] || "bg-gray-100 text-gray-700";
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AuthGate({ title, onLogin, showAuthModal, setShowAuthModal }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <button
          onClick={onLogin}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
        >
          Login to Continue
        </button>
      </motion.div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default function OrdersPage() {
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(!isSignedIn);
  const { data: ordersRes, isLoading } = useGetUserOrdersQuery(undefined, { skip: !isSignedIn });
  const orders = ordersRes?.data || [];

  if (!isSignedIn) {
    return (
      <AuthGate
        title="Log in to see your orders"
        onLogin={() => setShowAuthModal(true)}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />
    );
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-12 h-12 text-emerald-600" />
      </div>
    );

  if (!orders.length)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="relative z-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8">You haven't placed any orders. Start shopping to see them here.</p>
          <Link
            href="/"
            className="inline-flex px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="containermx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-4 text-emerald-600">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">Your Orders</h1>
          <p className="text-lg text-gray-600">Track and review everything you've ordered.</p>
        </motion.div>

        <div className="space-y-4">
          {orders.map((o, index) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/orders/${o.id}`}
                className="group block bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{o.order_number}</p>
                      <p className="text-sm text-gray-400">
                        {formatDate(o.created_at)} · {o.item_count} item{o.item_count === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      {o.payment_method ? `${titleCase(o.payment_method)} · ${titleCase(o.payment_status)}` : "Payment pending"}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(o.total)}</p>
                      <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadgeClass(o.status)}`}>
                        {titleCase(o.status)}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
