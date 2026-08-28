// components/products/ProductCard.js
"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import {
  selectSize,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "@/redux/API_Slices/productSlice";
import { NumberCounter } from "@/lib/NumberCounter";
import Link from "next/link";

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    {/* Image Skeleton */}
    <div className="relative h-[15rem] bg-gray-200 animate-pulse" />

    {/* Content */}
    <div className="p-4 space-y-4">
      {/* Categories Skeleton */}
      <div className="flex gap-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Price Skeleton */}
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

      {/* Size Options Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse" />
    </div>
  </div>
);
const ProductCard = ({ product, isLoading = false }) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const selectedSize = useSelector(
    (state) => state.products.selectedSize[product.id]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const [quantity, setQuantity] = useState(1);
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Find cart item
  const cartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === selectedSize
  );

  // Update local quantity when cart changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  // Show price temporarily when quantity changes
  useEffect(() => {
    if (cartItem) {
      setShowPrice(true);
      const timer = setTimeout(() => {
        setShowPrice(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [quantity, cartItem]);

  const getCurrentPrice = () => {
    if (!selectedSize) {
      const defaultSize = product.sizes[0];
      return defaultSize ? defaultSize.price * quantity : null;
    }
    const sizeOption = product.sizes.find((s) => s.size === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (size) => {
    dispatch(selectSize({ productId: product.id, size }));
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);

    if (cartItem) {
      if (newQuantity === 0) {
        dispatch(
          removeFromCart({
            productId: product.id,
            size: selectedSize,
          })
        );
      } else {
        dispatch(
          updateCartQuantity({
            productId: product.id,
            size: selectedSize,
            quantity: newQuantity,
          })
        );
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedSize || product.sizes[0]) {
      const sizeToUse = selectedSize || product.sizes[0].size;
      if (cartItem) {
        dispatch(
          updateCartQuantity({
            productId: product.id,
            size: sizeToUse,
            quantity,
          })
        );
      } else {
        dispatch(
          addToCart({
            productId: product.id,
            size: sizeToUse,
            quantity,
          })
        );
      }
    }
  };

  const isInCart = isClient && cartItem !== undefined;
  const totalPrice = getCurrentPrice();
  const unitPrice = totalPrice ? totalPrice / quantity : null;
  const clientSelectedSize = isClient && selectedSize;

  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-lg transition-shadow duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative h-[15rem] overflow-hidden">
        {product.discount && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded z-10">
            -{product.discount}%
          </div>
        )}
        <Link href={`/details/${product?.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product?.categories?.map((cat, idx) => (
            <span key={idx} className="text-xs text-gray-500">
              {cat}
              {idx < product.categories.length - 1 && ", "}
            </span>
          ))}
        </div>

        {/* Name */}
        <Link
          href={`/details/${product?.id}`}
          className=" block text-lg font-medium mb-2 hover:text-green-500 "
        >
          {product.name}
        </Link>

        {/* Price Range */}
        <div className="mb-3">
          {isInCart || clientSelectedSize ? (
            <span className="text-green-600 font-medium">
              {quantity} × {unitPrice?.toFixed(2)}৳
              {/* {getCurrentPrice()?.toFixed(2)}৳ */}
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
                isClient && selectedSize === sizeOption.size
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-300 hover:border-green-500"
              }`}
            >
              {sizeOption.size}
            </button>
          ))}
        </div>

        {/* Add to Cart Controls */}
        {isInCart ? (
          <div className="flex h-12 gap-4">
            <div className="flex w-24 space-x-2 border rounded-md px-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 flex items-center justify-center text-black"
              >
                <Minus size={16} />
              </button>
              <div className="w-10 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 flex items-center justify-center text-black"
              >
                <Plus size={16} />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuantityChange(1)}
              className="flex-1 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 font-medium"
            >
              <ShoppingCart size={18} />
              <motion.span
                key={showPrice ? "price" : "text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {showPrice ? (
                  <>
                    <NumberCounter value={totalPrice} />৳
                  </>
                ) : (
                  "Add more"
                )}
              </motion.span>
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!clientSelectedSize}
            className={`w-full h-12 rounded-md ${
              clientSelectedSize
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } flex items-center justify-center gap-2 transition-colors`}
          >
            <ShoppingCart size={18} />
            {clientSelectedSize ? (
              <span>Add to Cart</span>
            ) : (
              <span>Select Weight</span>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
