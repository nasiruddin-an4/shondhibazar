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
import WishlistButton from "@/components/Wishlist/WishlistButton";
import Link from "next/link";

const ProductCardSkeleton = () => (
  <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
    <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />
    <div className="p-4 flex flex-col flex-grow space-y-3">
      <div className="h-4 w-16 bg-gray-200 rounded-full animate-pulse" />
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
      <div className="mt-auto h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
    </div>
  </div>
);

const ProductCard = ({ product, isLoading = false }) => {
  // Return skeleton loader if loading or no product
  if (isLoading || !product) {
    return <ProductCardSkeleton />;
  }

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

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

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
        dispatch(removeFromCart({ productId: product.id, variantId: selectedSize }));
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

  return (
    <div>
      <motion.div
        className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          {/* Product Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#faf9f7]">
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

          <div className="p-4 flex flex-col flex-grow">
            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-1.5">
              <span className="text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <Link
              href={`/details/${product?.slug || product?.id}`}
              className="block text-sm font-semibold text-gray-800 mb-0.5 line-clamp-2 min-h-[2.5rem] hover:text-green-600 transition-colors"
            >
              {product.name}
            </Link>

            {/* Price Range */}
            <div className="mb-1.5">
              <motion.span
                className="text-green-600 text-base font-bold"
                animate={{ scale: showPrice ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {isInCart || (isClient && selectedSize)
                  ? `${quantity} × ${unitPrice?.toFixed(2)}৳`
                  : `${product.price.min.toFixed(
                      2
                    )}৳ - ${product.price.max.toFixed(2)}৳`}
              </motion.span>
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

            {/* Add to Cart Controls */}
            <div className="mt-auto">
              {isInCart ? (
                <div className="flex h-10 gap-2">
                  <div className="flex w-20 space-x-1 border border-gray-300 rounded-lg px-1">
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
                    className="flex-1 rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-1 text-sm font-medium shadow-sm"
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
                  disabled={!(isClient && selectedSize)}
                  className={`w-full h-10 rounded-lg text-sm font-medium shadow-sm ${
                    isClient && selectedSize
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  } flex items-center justify-center gap-1 transition-all`}
                >
                  <ShoppingCart size={16} />
                  {isClient && selectedSize ? (
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
    </div>
  );
};

export default ProductCard;
