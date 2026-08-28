"use client";
import Link from "next/link";

export default function RefundPolicyPage() {
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
          <li className="text-gray-900 font-semibold">Refund Policy</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#C9D158] to-[#a9b13f] text-white text-center">
        <h1 className="text-5xl font-bold mb-6">Refund Policy</h1>
        <p className="text-xl max-w-2xl mx-auto">
          We want you to be completely satisfied with your purchase. Please read
          our refund policy below.
        </p>
      </section>

      {/* Policy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Eligibility for Refunds
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              Refunds are available for products that are damaged, defective, or
              incorrect upon delivery.
            </li>
            <li>
              Requests must be made within 3 days of receiving your order.
            </li>
            <li>Products must be unused and in original packaging.</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            How to Request a Refund
          </h2>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              Contact our support team at{" "}
              <a
                href="mailto:contact@shondhibazar.com"
                className="text-green-600 underline"
              >
                contact@shondhibazar.com
              </a>{" "}
              or call +880 1958 585 267.
            </li>
            <li>
              Provide your order number, details of the issue, and photos if
              applicable.
            </li>
            <li>
              Our team will review your request and respond within 2 business
              days.
            </li>
          </ol>
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Refund Process
          </h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              Approved refunds will be processed to your original payment method
              within 7 business days.
            </li>
            <li>
              If you paid Cash on Delivery, we will arrange a suitable refund
              method.
            </li>
            <li>
              Shipping fees are non-refundable unless the return is due to our
              error.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Questions?</h2>
          <p className="text-gray-700">
            For any questions, please contact us at{" "}
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
