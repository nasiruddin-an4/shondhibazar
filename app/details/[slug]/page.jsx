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
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Star,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { NumberCounter } from "@/lib/NumberCounter";
import TabsSection from "@/components/ProductDetails/TabsSection";
import { useGetProductReviewsQuery, useGetProductBySlugQuery, useGetProductsQuery } from "@/redux/API_Query/ecommerceApi";
import WishlistButton from "@/components/Wishlist/WishlistButton";

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
  const [activeTab, setActiveTab] = useState("additional");

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showQuantityControls, setShowQuantityControls] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const resolvedParams = use(params);
  const routeSlug = resolvedParams.slug;

  const { data: product, isLoading: productLoading } = useGetProductBySlugQuery(routeSlug);
  const productId = product?.id;

  // Some catalog entries list the same weight more than once (duplicate variants);
  // collapse them to one button each, keeping the first occurrence of each label.
  const uniqueSizes = [];
  if (product?.sizes) {
    const seenLabels = new Set();
    for (const size of product.sizes) {
      if (!seenLabels.has(size.size)) {
        seenLabels.add(size.size);
        uniqueSizes.push(size);
      }
    }
  }

  const { data: productsRes, isLoading: relatedLoading } = useGetProductsQuery({ limit: 100 });
  const allProducts = Array.isArray(productsRes) ? productsRes : (productsRes?.data || []);

  // Prefer same-category products, but backfill with other products so the
  // "You may also like" section is never left empty for sparsely-populated categories.
  const relatedProducts = product
    ? (() => {
        const sameCategory = allProducts.filter(
          (p) => p.id !== product.id && p.category === product.category
        );
        if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
        const otherIds = new Set(sameCategory.map((p) => p.id));
        const others = allProducts.filter((p) => p.id !== product.id && !otherIds.has(p.id));
        return [...sameCategory, ...others].slice(0, 4);
      })()
    : [];

  const { data: reviewsRes, isLoading: reviewsLoading } = useGetProductReviewsQuery(productId, {
    skip: !product,
  });
  const reviews = reviewsRes?.data || [];
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const selectedSize = useSelector(
    (state) => state.products.selectedSize[productId]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const cartItem = isClient
    ? cartItems.find(
        (item) => item.productId === productId && item.variantId === selectedSize
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

  // Default to the first weight option. Only fires while selectedSize has never been
  // touched (undefined) — after "Clear selection" it's explicitly set to null, which
  // this leaves alone so Clear still works.
  const defaultSizeId = uniqueSizes[0]?.id;
  useEffect(() => {
    if (productId && defaultSizeId && selectedSize === undefined) {
      dispatch(selectSize({ productId, variantId: defaultSizeId }));
    }
  }, [productId, defaultSizeId, selectedSize, dispatch]);

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
    const sizeOption = product?.sizes.find((s) => s.id === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (sizeOption) => {
    dispatch(selectSize({ productId, variantId: sizeOption.id }));
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
          variantId: selectedSize,
          quantity: newQuantity,
        })
      );
    }
  };
  const handleAddToCart = () => {
    const sizeOptionToUse = selectedSize
      ? product.sizes.find((s) => s.id === selectedSize)
      : product.sizes[0];
    if (sizeOptionToUse) {
      if (cartItem) {
        dispatch(
          updateCartQuantity({
            productId,
            variantId: sizeOptionToUse.id,
            quantity,
          })
        );
      } else {
        dispatch(
          addToCart({
            productId,
            variantId: sizeOptionToUse.id,
            size: sizeOptionToUse.size,
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
  const selectedSizeLabel = product?.sizes.find((s) => s.id === selectedSize)?.size;

  const handleClear = () => {
    setShowQuantityControls(false);
    // Reset quantity to 1
    setQuantity(1);

    // Remove from cart if it exists
    if (cartItem) {
      dispatch(
        removeFromCart({
          productId,
          variantId: selectedSize,
        })
      );
    }

    // Clear selected size by dispatching null
    dispatch(selectSize({ productId, variantId: null }));

    // Force total price recalculation
    getCurrentPrice(); // This will now return null since selectedSize is null
  };

  if (productLoading) {
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
              href="/product-category"
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
        className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap"
        variants={fadeIn}
      >
        <Link href="/" className="hover:text-green-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <Link
          href={`/product-category?category=${encodeURIComponent(product.category)}`}
          className="hover:text-green-600 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <span className="text-gray-800 font-medium truncate max-w-[60vw]">{product.name}</span>
      </motion.div>

      {/* Main Product Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16"
        variants={fadeIn}
      >
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative bg-[#faf9f7] rounded-2xl border border-gray-100 p-8 mb-4 md:sticky md:top-24 overflow-hidden group">
            <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {product.category}
            </span>
            <div className="absolute top-4 right-4 z-10">
              <WishlistButton
                variantId={selectedSize || product.sizes?.[0]?.id}
                size={18}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
              />
            </div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={450}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              unoptimized={product.image?.toLowerCase().endsWith(".gif")}
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
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">{product.name}</h1>
            {reviews.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </span>
                <span className="font-medium text-gray-700">{averageRating.toFixed(1)}</span>
                <span className="underline decoration-transparent hover:decoration-gray-400">
                  ({reviews.length} review{reviews.length === 1 ? "" : "s"})
                </span>
              </button>
            )}
          </div>

          <div className="mb-2">
            {isInCart || selectedSize ? (
              <span className="text-green-600 font-bold text-2xl">
                {unitPrice?.toFixed(2)}৳
              </span>
            ) : (
              <span className="text-green-600 font-bold text-2xl">
                {product.price.min.toFixed(2)}৳ - {product.price.max.toFixed(2)}৳
              </span>
            )}
          </div>

          <div className="prose prose-green max-w-none mb-6">
            <div className="text-gray-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Weight Selection */}
          <motion.div className="space-y-3 mb-2" variants={fadeIn}>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              WEIGHT: {selectedSizeLabel ? <span className="font-normal normal-case">{selectedSizeLabel}</span> : <span className="font-normal normal-case text-gray-400">No selection</span>}
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size) => (
                <motion.button
                  key={size.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selectedSize === size.id
                      ? "border-green-600 bg-green-50 text-green-700 font-medium ring-1 ring-green-600"
                      : "border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50/50"
                  }`}
                >
                  {size.size}
                </motion.button>
              ))}
            </div>
            {totalPrice && (
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClear}
                  className="text-sm underline text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear selection
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Add to Cart Section */}
          <div className="flex items-center gap-3 w-full mb-2 pt-4">
            <div className="flex items-center border border-gray-300 rounded-lg h-12 w-[100px] bg-white shrink-0">
              <span className="flex-1 text-center font-medium text-gray-800">
                {quantity}
              </span>
              <div className="flex flex-col border-l border-gray-300 h-full w-8">
                <button
                  className="flex-1 flex items-center justify-center border-b border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-tr-lg"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <ChevronUp size={14} className="text-gray-600" />
                </button>
                <button
                  className="flex-1 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-br-lg"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <ChevronDown size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: selectedSize ? 1.01 : 1 }}
              whileTap={{ scale: selectedSize ? 0.99 : 1 }}
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 h-12 px-6 rounded-lg shadow-sm ${
                selectedSize
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              } transition-colors font-semibold flex items-center justify-center gap-2`}
            >
              <ShoppingCart size={18} />
              <span>{buttonText}</span>
            </motion.button>
          </div>

          {/* Flat Shipping Rate */}
          <div className="border-t border-gray-200 pt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <TruckIcon size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Flat shipping, all over Dhaka</p>
                <p className="text-xs text-gray-500 mt-0.5">Order before 2:30pm for same-day dispatch (Uttara only)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <RefreshCcw size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">3 days easy returns</p>
                <p className="text-xs text-gray-500 mt-0.5">Not satisfied? Send it back, hassle-free</p>
              </div>
            </div>
          </div>

          {/* Guaranteed Safe Checkout */}
          <div className="border border-gray-200 rounded-xl p-4 text-center mb-2 mt-2 bg-gray-50/50">
            <span className="text-xs font-bold uppercase flex items-center justify-center gap-1.5 text-gray-800 tracking-wide">
              <ShieldCheck size={14} className="text-green-600" />
              Guaranteed Safe Checkout
            </span>
            <div className="flex justify-center items-center gap-3 mt-4">
               {/* Using generic placeholders as requested in the plan */}
               <div className="px-3 py-1 bg-white text-xs font-bold text-gray-600 border border-gray-200 rounded">EBL SKYPAY</div>
               <div className="px-3 py-1 bg-white text-xs font-bold text-gray-600 border border-gray-200 rounded">Mastercard</div>
               <div className="px-3 py-1 bg-white text-xs font-bold text-gray-600 border border-gray-200 rounded">Visa</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs Section */}
      <TabsSection
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviews={reviews}
        reviewsLoading={reviewsLoading}
        isLoading={isLoading}
      />

      {/* Meta Information */}
      <div className="mt-12 pt-6 text-sm flex flex-col md:flex-row items-center justify-center gap-4 text-gray-800 pb-12 border-b border-gray-100">
        <div>
          <span className="font-semibold text-gray-900">SKU:</span>{" "}
          <span className="text-gray-600">N/A</span>
        </div>
        <div className="hidden md:block text-gray-300">|</div>
        <div>
          <span className="font-semibold text-gray-900">Categories:</span>{" "}
          <Link href="/product-category" className="text-gray-600 hover:text-green-600 underline decoration-transparent hover:decoration-green-600 transition-all">All Products</Link>
          <span className="text-gray-400 mx-1">,</span>
          <Link href={`/product-category?category=${encodeURIComponent(product.category)}`} className="text-gray-600 hover:text-green-600 underline decoration-transparent hover:decoration-green-600 transition-all">{product.category}</Link>
        </div>
      </div>

      {/* Related Products */}
      {(relatedLoading || relatedProducts.length > 0) && (
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">You may also like</h2>
            <p className="text-sm text-gray-500 mt-1">More picks from {product.category}</p>
          </div>
          <Link
            href={`/product-category?category=${encodeURIComponent(product.category)}`}
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors shrink-0"
          >
            View all
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ProductCard key={index} product={{ sizes: [] }} isLoading index={index} />
              ))
            : relatedProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={item} index={index} />
                </motion.div>
              ))}
        </div>
      </motion.div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
