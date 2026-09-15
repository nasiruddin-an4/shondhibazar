// components/products/PopularProducts.js
"use client";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const products = useSelector((state) => state.products.products);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-[#374151]"
        >
          Our most popular products
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
