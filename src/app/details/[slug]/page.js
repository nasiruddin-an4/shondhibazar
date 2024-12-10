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

const ProductDetails = ({ params }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.slug);

  // Get product from Redux store using URL param
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === productId);

  // Get selected size and cart information
  const selectedSize = useSelector(
    (state) => state.products.selectedSize[productId]
  );
  const cartItems = useSelector((state) => state.products.cart);
  const cartItem = isClient
    ? cartItems.find(
        (item) => item.productId === productId && item.size === selectedSize
      )
    : null;

  // Update quantity when cart changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const getCurrentPrice = () => {
    if (!selectedSize && product) {
      const defaultSize = product.sizes[0];
      return defaultSize ? defaultSize.price * quantity : null;
    }
    const sizeOption = product?.sizes.find((s) => s.size === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (size) => {
    dispatch(selectSize({ productId, size }));
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);

    if (cartItem) {
      if (newQuantity === 0) {
        dispatch(
          removeFromCart({
            productId,
            size: selectedSize,
          })
        );
      } else {
        dispatch(
          updateCartQuantity({
            productId,
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
  };

  // Replace the existing error check with this:

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
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
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/category/rice" className="hover:text-green-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-400">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="bg-[#faf9f7] rounded-xl p-8 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={450}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="text-2xl text-green-600 font-bold">
            {cartItem ? (
              <span>
                {quantity} × {(getCurrentPrice() / quantity)?.toFixed(2)}৳ ={" "}
                {getCurrentPrice()?.toFixed(2)}৳
              </span>
            ) : (
              `${product.price.min.toFixed(2)}৳ - ${product.price.max.toFixed(
                2
              )}৳`
            )}
          </div>

          <div className="prose prose-green max-w-none">
            <div className="text-gray-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Weight Selection */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">WEIGHT</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => handleSizeSelect(size.size)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === size.size
                      ? "border-green-500 bg-green-50 text-green-600"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex border rounded-md">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-12 flex items-center justify-center border-r hover:bg-gray-50"
              >
                <Minus size={20} />
              </button>
              <span className="w-16 flex items-center justify-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-12 flex items-center justify-center border-l hover:bg-gray-50"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 ${
                selectedSize
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-3 px-6 rounded-md 
              transition-colors font-medium flex items-center justify-center gap-2`}
            >
              <ShoppingCart size={20} />
              <span>{cartItem ? "Update Cart" : "Add to Cart"}</span>
            </button>
          </div>

          {/* Rest of the component remains the same... */}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-16">
        {/* Tab Headers */}
        <div className="border-b mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 text-lg font-medium relative transition-colors
          ${
            activeTab === "description"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
            >
              Description
              {activeTab === "description" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`px-6 py-4 text-lg font-medium relative transition-colors
          ${
            activeTab === "additional"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
            >
              Additional information
              {activeTab === "additional" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 text-lg font-medium relative transition-colors
          ${
            activeTab === "reviews"
              ? "text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
            >
              Reviews (0)
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg p-6">
          {activeTab === "description" && <Description product={product} />}
          {activeTab === "additional" && <Additional product={product} />}

          {activeTab === "reviews" && <Reviews reviews={reviews} />}
        </div>
      </div>
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProduct?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
