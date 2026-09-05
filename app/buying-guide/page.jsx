"use client";
import Link from "next/link";
import { ShoppingCart, CreditCard, Truck, HelpCircle, ChevronRight } from "lucide-react";

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-900/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center mx-auto mb-8 shadow-xl border border-white/20">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Buying Guide</h1>
          <p className="text-xl text-emerald-50 leading-relaxed max-w-2xl mx-auto">
            Make the most of your Shondhibazar shopping experience with our simple, step-by-step buying guide.
          </p>
        </div>
      </section>

      {/* Guide Content */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="p-8 md:p-12 space-y-12">
            
            {/* How to Shop */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How to Shop</h2>
              </div>
              <ol className="space-y-4">
                {[
                  "Browse our categories or use the search bar to find products.",
                  "Select your desired product, choose the weight/size, and click 'Add to Cart'.",
                  "Review your cart and proceed to checkout when ready.",
                  "Fill in your shipping information and select your preferred payment method.",
                  "Place your order and receive a confirmation email."
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-lg text-gray-700 leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <hr className="border-gray-100" />

            {/* Payment Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Payment Methods</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "Cash on Delivery", desc: "Pay when you receive" },
                  { title: "bKash / Nagad", desc: "Mobile banking" },
                  { title: "Visa / MasterCard", desc: "Secure card payment" }
                ].map((method, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                    <p className="text-sm text-gray-500">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Delivery & Returns */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Truck className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Delivery & Returns</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-700">
                  <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Flat shipping rate across Dhaka: <strong className="text-gray-900">BDT 80</strong></span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-700">
                  <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Free shipping on orders over <strong className="text-gray-900">BDT 1000</strong></span>
                </li>
                <li className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-700 md:col-span-2">
                  <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Easy 3-day returns for eligible products</span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* Questions */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between border border-emerald-100/50">
              <div className="flex items-center space-x-4 mb-6 md:mb-0">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-600">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Need Help?</h2>
                  <p className="text-lg text-gray-600">Visit our FAQ or reach out directly.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link href="/about/faq" className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-all text-center">
                  View FAQs
                </Link>
                <a href="mailto:contact@shondhibazar.com" className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-0.5 text-center">
                  Contact Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
