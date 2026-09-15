// components/products/SignatureItems.js
"use client";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "../PopularProducts/ProductCard";

const SIGNATURE_ITEMS_LIMIT = 8;

const SignatureItems = () => {
  const allProducts = useSelector((state) => state.products.products);
  const products = allProducts.slice(0, SIGNATURE_ITEMS_LIMIT);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold text-green-600 tracking-wide uppercase">
              Handpicked for you
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
              Our Signature Items
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              A curated selection of customer favorites, fresh from the farm to your door.
            </p>
          </motion.div>
          <Link
            href="/product-category"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors shrink-0"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/product-category"
            className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
