// components/products/SignatureItems.js
"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { selectSize, addToCart } from "@/redux/API_Slices/productSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const selectedSize = useSelector(
    (state) => state.products.selectedSize[product.id]
  );
  const [quantity, setQuantity] = useState(1);

  const getCurrentPrice = () => {
    if (!selectedSize) return null;
    const sizeOption = product.sizes.find((s) => s.size === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (size) => {
    dispatch(selectSize({ productId: product.id, size }));
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      dispatch(
        addToCart({
          productId: product.id,
          size: selectedSize,
          quantity,
        })
      );
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {product.discount && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
            -{product.discount}%
          </div>
        )}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {(Array.isArray(product.categories)
            ? product.categories
            : [product.category]
          ).map((cat, idx) => (
            <span key={idx} className="text-xs text-gray-500">
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium mb-2">{product.name}</h3>

        {/* Price Range */}
        <div className="mb-3">
          {selectedSize ? (
            <span className="text-green-600 font-medium">
              {getCurrentPrice()?.toFixed(2)}৳
            </span>
          ) : (
            <span className="text-green-600 font-medium">
              {product.price.min.toFixed(2)}৳ - {product.price.max.toFixed(2)}৳
            </span>
          )}
        </div>

        {/* Size Options */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.sizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              onClick={() => handleSizeSelect(sizeOption.size)}
              className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                selectedSize === sizeOption.size
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-300 hover:border-green-500"
              }`}
            >
              {sizeOption.size}
            </button>
          ))}
        </div>

        {/* Add to Cart with Quantity Controls */}
        {selectedSize ? (
          <div className="flex h-12">
            {" "}
            {/* Fixed height container */}
            <button
              onClick={() => handleQuantityChange(-1)}
              className={`w-12 flex items-center justify-center rounded-l-md ${
                quantity <= 1
                  ? "bg-gray-100 text-gray-400"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 font-medium"
            >
              <ShoppingCart size={18} />
              <span>
                {quantity} × {getCurrentPrice()?.toFixed(2)}৳
              </span>
            </motion.button>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-12 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 rounded-r-md"
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button
            className="w-full h-12 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
            disabled
          >
            Select size first
          </button>
        )}
      </div>
    </motion.div>
  );
};

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
