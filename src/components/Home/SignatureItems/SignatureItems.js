// components/products/SignatureItems.js
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { selectSize, addToCart } from "@/redux/API_Slices/productSlice";
import ProductCard from "../PopularProducts/ProductCard";

const SignatureItems = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Signature Items
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
