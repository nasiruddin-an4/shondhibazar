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
import WishlistButton from "@/components/Wishlist/WishlistButton";

// Soft pastel backdrops behind the product photo on mobile, cycled by grid
// position — desktop keeps the plain studio-grey backdrop.
const MOBILE_PASTELS = [
  "bg-[#f2ecd9]",
  "bg-[#dcebf5]",
  "bg-[#e6e1f5]",
  "bg-[#e8ece2]",
  "bg-[#f5e3e6]",
  "bg-[#f5ead9]",
];

const ProductCardSkeleton = ({ index = 0 }) => (
  <div className="h-full bg-white rounded-3xl sm:rounded-2xl overflow-hidden sm:border sm:border-gray-100 flex flex-col">
    <div className={`relative aspect-square sm:aspect-[4/3] rounded-3xl sm:rounded-none animate-pulse ${MOBILE_PASTELS[index % MOBILE_PASTELS.length]} sm:bg-gray-200`} />
    <div className="p-2 sm:p-4 flex flex-col flex-grow space-y-2 sm:space-y-3">
      <div className="hidden sm:block h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-1.5 min-h-[26px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-14 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="mt-auto h-10 w-full bg-gray-200 rounded-full sm:rounded-lg animate-pulse" />
    </div>
  </div>
);

const ProductCard = ({ product, isLoading = false, index = 0 }) => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const selectedSize = useSelector(
    (state) => state.products.selectedSize[product.id]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const [quantity, setQuantity] = useState(1);
  const [showPrice, setShowPrice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Find cart item
  const cartItem = cartItems.find(
    (item) => item.productId === product.id && item.variantId === selectedSize
  );

  // Some catalog entries list the same weight more than once (duplicate variants),
  // and some single-variant products carry no weight label at all — collapse
  // duplicates and drop blank labels so we never render an empty pill button.
  const uniqueSizes = [];
  if (product.sizes) {
    const seenLabels = new Set();
    for (const size of product.sizes) {
      const label = size.size?.trim();
      if (!label || seenLabels.has(label)) continue;
      seenLabels.add(label);
      uniqueSizes.push(size);
    }
  }
  // Only show the selector when there's an actual choice to make.
  const hasSelectableSizes = uniqueSizes.length > 1;

  // Default to the first weight option so the card is add-to-cart-ready without a click.
  const defaultSizeId = uniqueSizes[0]?.id ?? product.sizes?.[0]?.id;
  useEffect(() => {
    if (defaultSizeId && selectedSize === undefined) {
      dispatch(selectSize({ productId: product.id, variantId: defaultSizeId }));
    }
  }, [product.id, defaultSizeId, selectedSize, dispatch]);

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
    const sizeOption = product.sizes.find((s) => s.id === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (sizeOption) => {
    dispatch(selectSize({ productId: product.id, variantId: sizeOption.id }));
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
            variantId: selectedSize,
          })
        );
      } else {
        dispatch(
          updateCartQuantity({
            productId: product.id,
            variantId: selectedSize,
            quantity: newQuantity,
          })
        );
      }
    }
  };

  const handleAddToCart = () => {
    const sizeOptionToUse = selectedSize
      ? product.sizes.find((s) => s.id === selectedSize)
      : product.sizes[0];
    if (!sizeOptionToUse) return;

    if (cartItem) {
      dispatch(
        updateCartQuantity({
          productId: product.id,
          variantId: sizeOptionToUse.id,
          quantity,
        })
      );
    } else {
      dispatch(
        addToCart({
          productId: product.id,
          variantId: sizeOptionToUse.id,
          size: sizeOptionToUse.size,
          quantity,
        })
      );
    }
  };

  const isInCart = isClient && cartItem !== undefined;
  const totalPrice = getCurrentPrice();
  const unitPrice = totalPrice ? totalPrice / quantity : null;
  const clientSelectedSize = isClient && selectedSize;

  if (isLoading) {
    return <ProductCardSkeleton index={index} />;
  }
  return (
    <motion.div
      className="h-full bg-white rounded-3xl sm:rounded-2xl overflow-hidden border border-transparent sm:border-gray-100 sm:hover:border-gray-200 sm:hover:shadow-lg sm:hover:-translate-y-0.5 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div
          className={`relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-3xl sm:rounded-none ${MOBILE_PASTELS[index % MOBILE_PASTELS.length]} sm:bg-[#faf9f7]`}
        >
          {product.discount && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full z-10 shadow-sm"
            >
              -{product.discount}%
            </motion.div>
          )}
          <div className="absolute top-2 right-2 z-10">
            <WishlistButton
              variantId={selectedSize || product.sizes?.[0]?.id}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            />
          </div>
          <Link href={`/details/${product?.slug || product?.id}`} className="block w-full h-full">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="p-2.5 sm:p-4 flex flex-col flex-grow">
          {/* Category — hidden on mobile to match the simplified card */}
          {product.category && (
            <div className="hidden sm:flex flex-wrap gap-1 mb-1.5">
              <span className="text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>
          )}

          {/* Name */}
          <Link
            href={`/details/${product?.slug || product?.id}`}
            className="block text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] hover:text-green-600 transition-colors"
          >
            {product.name}
          </Link>

          {/* Price Range + mobile quick-add control (a compact circular button
              instead of the full-width bar desktop uses) */}
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <motion.span
              className="text-green-600 text-sm sm:text-base font-bold"
              animate={{ scale: showPrice ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {isInCart || clientSelectedSize
                ? `${quantity} × ${unitPrice?.toFixed(2)}৳`
                : `${product.price.min.toFixed(2)}৳ - ${product.price.max.toFixed(2)}৳`}
            </motion.span>

            <div className="sm:hidden shrink-0">
              {isInCart ? (
                <div className="flex items-center gap-1 bg-green-50 rounded-full px-1 py-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-6 h-6 flex items-center justify-center text-green-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-bold text-green-800 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-6 h-6 flex items-center justify-center text-green-700"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={!clientSelectedSize}
                  aria-label="Add to cart"
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors ${
                    clientSelectedSize
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <Plus size={18} />
                </motion.button>
              )}
            </div>
          </div>

          {/* Size Options — reserve the row's height even when there's nothing to pick,
              so cards with and without a weight choice still line up. */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3 min-h-[26px]">
            {hasSelectableSizes &&
              uniqueSizes.map((sizeOption) => (
                <motion.button
                  key={sizeOption.id}
                  onClick={() => handleSizeSelect(sizeOption)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2.5 py-1 rounded-full border text-xs transition-all ${
                    isClient && selectedSize === sizeOption.id
                      ? "border-green-600 bg-green-50 text-green-700 font-medium ring-1 ring-green-600"
                      : "border-gray-300 text-gray-600 hover:border-green-400 hover:bg-green-50/50"
                  }`}
                >
                  {sizeOption.size}
                </motion.button>
              ))}
          </div>

          {/* Add to Cart Controls (desktop) — mobile uses the compact circular
              button/stepper next to the price instead */}
          <div className="hidden sm:block sm:mt-auto">
            {isInCart ? (
              <div className="flex h-10 gap-2">
                <div className="flex w-20 space-x-1 border border-gray-300 rounded-full sm:rounded-lg px-1">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-8 flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <div className="w-8 flex items-center justify-center text-sm font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-8 flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleQuantityChange(1)}
                  className="flex-1 rounded-full sm:rounded-lg bg-green-100 sm:bg-green-500 hover:bg-green-200 sm:hover:bg-green-600 text-green-800 sm:text-white flex items-center justify-center gap-1 text-xs sm:text-sm font-bold sm:font-medium uppercase sm:normal-case tracking-wide sm:tracking-normal shadow-none sm:shadow-sm"
                >
                  <ShoppingCart size={16} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={showPrice ? "price" : "text"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPrice ? (
                        <>
                          <NumberCounter value={totalPrice} />৳
                        </>
                      ) : (
                        "Add more"
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!clientSelectedSize}
                className={`w-full h-10 rounded-full sm:rounded-lg text-xs sm:text-sm font-bold sm:font-medium uppercase sm:normal-case tracking-wide sm:tracking-normal shadow-none sm:shadow-sm ${
                  clientSelectedSize
                    ? "bg-green-100 sm:bg-green-500 hover:bg-green-200 sm:hover:bg-green-600 text-green-800 sm:text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                } flex items-center justify-center gap-1 transition-all`}
              >
                <ShoppingCart size={16} />
                {clientSelectedSize ? (
                  <span>Add to Cart</span>
                ) : (
                  <span>Select Weight</span>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
