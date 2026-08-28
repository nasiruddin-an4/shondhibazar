"use client";
import Link from "next/link";

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-gray-100 py-3 px-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:underline text-green-700">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/about" className="hover:underline text-green-700">
              About
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-semibold">Buying Guide</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#C9D158] to-[#a9b13f] text-white text-center">
        <h1 className="text-5xl font-bold mb-6">Buying Guide</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Make the most of your Shondhibazar shopping experience with our
          step-by-step buying guide.
        </p>
      </section>

      {/* Guide Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            How to Shop
          </h2>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              Browse our categories or use the search bar to find products.
            </li>
            <li>
              Select your desired product, choose the weight/size, and click
              "Add to Cart".
            </li>
            <li>Review your cart and proceed to checkout when ready.</li>
            <li>
              Fill in your shipping information and select your preferred
              payment method.
            </li>
            <li>Place your order and receive a confirmation email.</li>
          </ol>
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Payment Methods
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Cash on Delivery (COD)</li>
            <li>bKash Mobile Payment</li>
            <li>Visa/MasterCard (where available)</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Delivery & Returns
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Flat shipping rate across Dhaka: BDT 80</li>
            <li>Free shipping on orders over BDT 1000</li>
            <li>Easy 3-day returns for eligible products</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Need Help?</h2>
          <p className="text-gray-700">
            Visit our{" "}
            <Link href="/about/faq" className="text-green-600 underline">
              FAQ
            </Link>{" "}
            page or contact us at{" "}
            <a
              href="mailto:contact@shondhibazar.com"
              className="text-green-600 underline"
            >
              contact@shondhibazar.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
