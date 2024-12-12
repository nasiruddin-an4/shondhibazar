import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="relative h-[15rem] bg-gray-200 animate-pulse" />
    <div className="p-3 space-y-3">
      <div className="flex gap-2">
        <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-7 w-14 bg-gray-200 rounded-md animate-pulse"
          />
        ))}
      </div>
      <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
    </div>
  </div>
);

const ProductCard = ({ product, isLoading = false }) => {
  // Return skeleton loader if loading or no product
  if (isLoading || !product) {
    return <ProductCardSkeleton />;
  }

  const dispatch = useDispatch();
  const selectedSize = useSelector(
    (state) => state.products.selectedSize[product.id]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const [quantity, setQuantity] = useState(1);
  const [showPrice, setShowPrice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === selectedSize
  );

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
        dispatch(removeFromCart({ productId: product.id, size: selectedSize }));
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
          addToCart({ productId: product.id, size: sizeToUse, quantity })
        );
      }
    }
  };

  const isInCart = cartItem !== undefined;
  const totalPrice = getCurrentPrice();
  const unitPrice = totalPrice ? totalPrice / quantity : null;

  return (
    <div>
      <motion.div
        className="bg-white rounded-lg overflow-hidden hover:border hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Product Image */}
          <div className="relative h-[15rem] overflow-hidden">
            {product.discount && (
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded-full z-10"
              >
                -{product.discount}%
              </motion.div>
            )}
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-3 flex flex-col flex-grow">
            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-1">
              <span className="text-[11px] text-gray-500">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <Link
              href={`/details/${product?.id}`}
              className="block text-sm font-medium mb-1 hover:text-green-500 transition-colors"
            >
              {product.name}
            </Link>

            {/* Price Range */}
            <div className="mb-2">
              <motion.span
                className="text-green-600 text-sm font-medium"
                animate={{ scale: showPrice ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {isInCart || selectedSize
                  ? `${quantity} × ${unitPrice?.toFixed(2)}৳`
                  : `${product.price.min.toFixed(
                      2
                    )}৳ - ${product.price.max.toFixed(2)}৳`}
              </motion.span>
            </div>

            {/* Size Options */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.sizes.map((sizeOption) => (
                <motion.button
                  key={sizeOption.size}
                  onClick={() => handleSizeSelect(sizeOption.size)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-2 py-1 border rounded-md text-xs transition-all ${
                    selectedSize === sizeOption.size
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-gray-300 hover:border-green-500 hover:bg-gray-50"
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
                  <div className="flex w-20 space-x-1 border rounded-md px-1">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-8 flex items-center justify-center text-black"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="w-8 flex items-center justify-center text-sm">
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-8 flex items-center justify-center text-black"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleQuantityChange(1)}
                    className="flex-1 rounded-md bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-1 text-sm"
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
                  disabled={!selectedSize}
                  className={`w-full h-10 rounded-md text-sm ${
                    selectedSize
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  } flex items-center justify-center gap-1 transition-all`}
                >
                  <ShoppingCart size={16} />
                  {selectedSize ? (
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
