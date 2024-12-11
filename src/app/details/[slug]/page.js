"use client";

import ProductCard from "@/components/Home/PopularProducts/ProductCard";
import Additional from "@/components/ProductDetails/Additional";
import Description from "@/components/ProductDetails/Description";
import Reviews from "@/components/ProductDetails/Reviews/Reviews";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  selectSize,
} from "@/redux/API_Slices/productSlice";
import {
  Clock,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingCart,
  TruckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { NumberCounter } from "@/lib/NumberCounter";
import TabsSection from "@/components/ProductDetails/TabsSection";

const reviews = [
  {
    id: 1,
    name: "Karim Ahmed",
    rating: 5,
    date: "March 15, 2024",
    comment:
      "আমি এই চাল খুবই পছন্দ করি। চালের মান খুব ভালো এবং স্বাদও খুব ভালো।",
    verified: true,
  },
  {
    id: 2,
    name: "Rahima Begum",
    rating: 4,
    date: "March 10, 2024",
    comment:
      "পরিষ্কার এবং ভালো মানের চাল। প্যাকেজিং ভালো ছিল। কিন্তু দাম একটু বেশি।",
    verified: true,
  },
  {
    id: 3,
    name: "Mohammad Hasan",
    rating: 5,
    date: "March 5, 2024",
    comment: "খুব ভালো প্রোডাক্ট। ডেলিভারি সার্ভিসও ভালো।",
    verified: true,
  },
];

const relatedProduct = [
  {
    id: 1,
    name: "ডেকিছাটা চাল [Dhekichata Rice]",
    category: "RICE",
    price: { min: 125.0, max: 3125.0 },
    sizes: [
      { size: "1kg", price: 125.0 },
      { size: "5kg", price: 625.0 },
      { size: "25kg", price: 3125.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2022/01/dekicata-cal-1-300x225.jpg",
  },
  {
    id: 2,
    name: "জিঙ্ক সমৃদ্ধ চাল(২৫ কেজি) [Zink Rice]",
    category: "RICE",
    price: { min: 90.0, max: 2250.0 },
    sizes: [
      { size: "1kg", price: 90.0 },
      { size: "5kg", price: 450.0 },
      { size: "25kg", price: 2250.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2022/01/zinc-rice-2-1-300x225.webp",
  },
  {
    id: 3,
    name: "পরেশ ঘি [Ghee]",
    categories: ["ALL PRODUCTS", "OIL & GHEE"],
    price: { min: 550.0, max: 2100.0 },
    sizes: [
      { size: "250gm", price: 550.0 },
      { size: "500gm", price: 1100.0 },
      { size: "1kg", price: 2100.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/09/ghee-03-300x225.webp",
    discount: 5,
  },
  {
    id: 4,
    name: "প্রিমিয়াম পাওয়া ঘি [Ghee]",
    categories: ["ALL PRODUCTS", "DIET FOODS", "OIL & GHEE"],
    price: { min: 450.0, max: 1600.0 },
    sizes: [
      { size: "250gm", price: 450.0 },
      { size: "500gm", price: 900.0 },
      { size: "1kg", price: 1600.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2021/06/Ghee-300x225.webp",
    discount: 11,
  },
  {
    id: 5,
    name: "পাওয়া ঘি [Ghee]",
    categories: ["ALL PRODUCTS", "DIET FOODS", "OIL & GHEE"],
    price: { min: 350.0, max: 1300.0 },
    sizes: [
      { size: "250gm", price: 350.0 },
      { size: "1kg", price: 1300.0 },
      { size: "500g", price: 650.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2021/06/ghee04-300x225.webp",
    discount: 7,
  },
  {
    id: 6,
    name: "সরষে খাঁটি ভাঙ্গা সরিষার তেল [extra virgin mustard oil]",
    categories: ["ALL PRODUCTS", "OIL", "OIL & GHEE"],
    price: { min: 135.0, max: 2300.0 },
    sizes: [
      { size: "225ml", price: 135.0 },
      { size: "1L", price: 460.0 },
      { size: "5L", price: 2300.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2021/04/shorsher-tel-small-01-1-300x225.webp",
    discount: 4,
  },
  {
    id: 7,
    name: "নিরাপদ মুরগীর মুরগী [Safe Broiler] (Skin Off)",
    categories: ["CHICKEN & MEAT"],
    price: { min: 480.0, max: 2400.0 },
    sizes: [
      { size: "1kg", price: 480.0 },
      { size: "5kg", price: 2400.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2020/07/nirapod-murgi-300x225.gif",
  },
  {
    id: 8,
    name: "মরিচ গুঁড়া [Chili Powder]",
    categories: ["SPICE POWDER", "SPICES"],
    price: { min: 45.0, max: 840.0 },
    sizes: [
      { size: "50gm", price: 45.0 },
      { size: "100gm", price: 90.0 },
      { size: "250gm", price: 210.0 },
      { size: "500gm", price: 420.0 },
      { size: "1kg", price: 840.0 },
    ],
    image:
      "https://shondhibazar.com/wp-content/uploads/2021/03/morich-04-300x225.webp",
  },
];

const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 animate-pulse">
    <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      <div className="bg-gray-200 rounded-xl aspect-square" />
      <div className="space-y-6">
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="h-6 w-1/4 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-1/4 bg-gray-200 rounded" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ProductDetails = ({ params }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showQuantityControls, setShowQuantityControls] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.slug);

  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === productId);

  const selectedSize = useSelector(
    (state) => state.products.selectedSize[productId]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const cartItem = isClient
    ? cartItems.find(
        (item) => item.productId === productId && item.size === selectedSize
      )
    : null;

  const [buttonText, setButtonText] = useState(
    cartItem ? "Update Cart" : "Add to Cart"
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  // const getCurrentPrice = () => {
  //   if (!selectedSize && product) {
  //     const defaultSize = product.sizes[0];
  //     return defaultSize ? defaultSize.price * quantity : null;
  //   }
  //   const sizeOption = product?.sizes.find((s) => s.size === selectedSize);
  //   return sizeOption ? sizeOption.price * quantity : null;
  // };

  const getCurrentPrice = () => {
    if (!selectedSize) {
      return null;
    }
    const sizeOption = product?.sizes.find((s) => s.size === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (size) => {
    dispatch(selectSize({ productId, size }));
    setQuantity(1);
    setShowQuantityControls(true);
  };

  // const handleQuantityChange = (change) => {
  //   const newQuantity = Math.max(0, quantity + change);
  //   setQuantity(newQuantity);

  //   if (cartItem) {
  //     if (newQuantity === 0) {
  //       dispatch(
  //         removeFromCart({
  //           productId,
  //           size: selectedSize,
  //         })
  //       );
  //     } else {
  //       dispatch(
  //         updateCartQuantity({
  //           productId,
  //           size: selectedSize,
  //           quantity: newQuantity,
  //         })
  //       );
  //     }
  //   }
  // };
  const handleQuantityChange = (change) => {
    // Set minimum value to 1 instead of 0
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);

    if (cartItem) {
      // Since minimum is 1, we don't need the newQuantity === 0 check anymore
      dispatch(
        updateCartQuantity({
          productId,
          size: selectedSize,
          quantity: newQuantity,
        })
      );
    }
  };
  const handleAddToCart = () => {
    if (selectedSize || product.sizes[0]) {
      const sizeToUse = selectedSize || product.sizes[0].size;
      if (cartItem) {
        dispatch(
          updateCartQuantity({
            productId,
            size: sizeToUse,
            quantity,
          })
        );
      } else {
        dispatch(
          addToCart({
            productId,
            size: sizeToUse,
            quantity,
          })
        );
      }
    }
    setButtonText("Added!");
    setTimeout(() => {
      setButtonText("Add More");
      setShowQuantityControls(true);
    }, 3000);
  };

  const isInCart = cartItem !== undefined;
  const totalPrice = getCurrentPrice();
  const unitPrice = totalPrice ? totalPrice / quantity : null;

  const handleClear = () => {
    setShowQuantityControls(false);
    // Reset quantity to 1
    setQuantity(1);

    // Remove from cart if it exists
    if (cartItem) {
      dispatch(
        removeFromCart({
          productId,
          size: selectedSize,
        })
      );
    }

    // Clear selected size by dispatching null
    dispatch(selectSize({ productId, size: null }));

    // Force total price recalculation
    getCurrentPrice(); // This will now return null since selectedSize is null
  };

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <motion.div
        className="min-h-[70vh] flex items-center justify-center px-4"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
      >
        <div className="text-center max-w-md mx-auto py-12 px-4">
          <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Not Found
          </h2>

          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the product you're looking for. It may have
            been removed or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      {/* Breadcrumb */}
      <motion.div
        className="flex items-center gap-2 text-sm text-gray-600 mb-6"
        variants={fadeIn}
      >
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/category/rice" className="hover:text-green-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-400">{product.name}</span>
      </motion.div>

      {/* Main Product Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        variants={fadeIn}
      >
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#faf9f7] rounded-xl p-8 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={450}
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="mb-3">
            {isInCart || selectedSize ? (
              <span className="text-green-600 font-medium">
                {quantity} × {unitPrice?.toFixed(2)}৳
              </span>
            ) : (
              <span className="text-green-600 font-medium">
                {product.price.min.toFixed(2)}৳ - {product.price.max.toFixed(2)}
                ৳
              </span>
            )}
          </div>

          <div className="prose prose-green max-w-none">
            <div className="text-gray-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Weight Selection */}
          <motion.div className="space-y-4" variants={fadeIn}>
            <h3 className="font-medium text-gray-700">
              WEIGHT {selectedSize && `: ${selectedSize}`}
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size.size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSizeSelect(size.size)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === size.size
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {size.size}
                </motion.button>
              ))}
            </div>
            {totalPrice && (
              <div className="flex items-center space-x-8 ">
                <p className="text-lg font-bold w-32">
                  <NumberCounter value={Number(totalPrice)} /> ৳
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className=" underline text-green-500 px-2 py-1 hover:text-red-400"
                >
                  Clear
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Add to Cart Section */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {showQuantityControls && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center border rounded-md w-full sm:w-auto h-12 sm:h-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(-1)}
                  className="flex-1 sm:w-12 h-full flex items-center justify-center border-r hover:bg-gray-50 min-w-[48px] active:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus size={24} className="text-gray-600" />
                </motion.button>
                <span className="flex-1 sm:w-16 h-full flex items-center justify-center font-medium text-lg min-w-[48px]">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(1)}
                  className="flex-1 sm:w-12 h-full flex items-center justify-center border-l hover:bg-gray-50 min-w-[48px] active:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus size={24} className="text-gray-600" />
                </motion.button>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 ${
                selectedSize
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-3 px-6 rounded-md 
    transition-colors font-medium flex items-center justify-center gap-2`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={buttonText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  <span>{buttonText}</span>
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs Section */}
      <TabsSection
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviews={reviews}
        isLoading={isLoading}
      />

      {/* Related Products */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2 className="text-2xl font-bold mb-8">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProduct?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
