"use client";
import Link from "next/link";
import { ShieldAlert, CreditCard, HeadphonesIcon, HelpCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Refund Policy</h1>
          <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Please read our simple and transparent refund policy below.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Eligibility */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Eligibility for Refunds</h2>
              </div>
              <ul className="list-disc pl-6 text-xl text-gray-600 space-y-3 leading-relaxed marker:text-emerald-500">
                <li>Refunds are available for products that are damaged, defective, or incorrect upon delivery.</li>
                <li>Requests must be made within <strong>3 days</strong> of receiving your order.</li>
                <li>Products must be unused and in original packaging.</li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* How to Request */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">How to Request a Refund</h2>
              </div>
              <ol className="list-decimal pl-6 text-xl text-gray-600 space-y-3 leading-relaxed marker:text-teal-500 marker:font-bold">
                <li>
                  Contact our support team at{" "}
                  <a href="mailto:contact@shondhibazar.com" className="text-emerald-600 font-semibold hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-500 transition-colors">
                    contact@shondhibazar.com
                  </a>{" "}
                  or call <strong>+880 1958 585 267</strong>.
                </li>
                <li>Provide your order number, details of the issue, and photos if applicable.</li>
                <li>Our team will review your request and respond within <strong>2 business days</strong>.</li>
              </ol>
            </div>

            <hr className="border-gray-100" />

            {/* Refund Process */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Refund Process</h2>
              </div>
              <ul className="list-disc pl-6 text-xl text-gray-600 space-y-3 leading-relaxed marker:text-emerald-500">
                <li>Approved refunds will be processed to your original payment method within <strong>7 business days</strong>.</li>
                <li>If you paid Cash on Delivery, we will arrange a suitable refund method.</li>
                <li>Shipping fees are non-refundable unless the return is due to our error.</li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* Questions */}
            <div className="bg-emerald-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Still have questions?</h2>
                  <p className="text-lg text-gray-600">We're here to help you out.</p>
                </div>
              </div>
              <a href="mailto:contact@shondhibazar.com" className="inline-flex items-center justify-center bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/30">
                Contact Support
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
