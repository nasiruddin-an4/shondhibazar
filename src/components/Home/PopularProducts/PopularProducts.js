// components/products/PopularProducts.js
"use client";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard"; // We'll extract the card to a separate component

const popularProducts = [
  {
    id: 1,
    name: "কাটারীভোগ চাল প্রিমিয়াম [Katarivogh Rice Premium]",
    categories: ["ALL PRODUCTS", "RICE"],
    price: { min: 190.0, max: 3750.0 },
    sizes: [
      { size: "1kg", price: 190.0 },
      { size: "5kg", price: 950.0 },
      { size: "25kg", price: 3750.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/06/Kataribhog-03-300x225.gif",
  },
  {
    id: 2,
    name: "মসুর ডাল দেশী [Premium  Moshur Daal]",
    categories: ["ALL PRODUCTS", "LENTIL"],
    price: { min: 75.0, max: 150.0 },
    sizes: [
      { size: "500gm", price: 75.0 },
      { size: "1kg", price: 150.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/04/mushur-daal-385x314-1-300x225.gif",
  },
  {
    id: 3,
    name: "প্রিমিয়াম মুগ ডাল [Premium Mug Daal]",
    categories: ["ALL PRODUCTS", "LENTIL"],
    price: { min: 90.0, max: 180.0 },
    sizes: [
      { size: "500gm", price: 90.0 },
      { size: "1kg", price: 180.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/09/mugdal-385x491-1-300x225.jpg",
  },
  {
    id: 4,
    name: "বুটের ডাল [Premium  Buter Daal Deshi]",
    categories: ["ALL PRODUCTS", "LENTIL"],
    price: { min: 76.0, max: 775.0 },
    sizes: [
      { size: "500gm", price: 76.0 },
      { size: "1kg", price: 155.0 },
      { size: "5kg", price: 775.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/04/Buter-daal-1-1-300x225.jpg",
  },
];

const PopularProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-[#374151]"
        >
          Our most popular products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
