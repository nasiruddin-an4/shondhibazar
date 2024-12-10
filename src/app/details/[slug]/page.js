"use client";

import ProductCard from "@/components/Home/PopularProducts/ProductCard";
import Additional from "@/components/ProductDetails/Additional";
import Description from "@/components/ProductDetails/Description";
import Reviews from "@/components/ProductDetails/Reviews/Reviews";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
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
import { useState } from "react";
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
const product = {
  id: 1,
  name: "ডেকিছাটা চাল [Dhekichata Rice]",
  description: `ডেকিছাটা চাল (Dhekichata Rice), যা আমাদের তৈরি করার যাবে বিশে আছে। আমরা যা আজকে নির্দিষ্ট যাবে। একটি পরিবারে চিজে উপযোগী।ডেকিছাটা চালের সংকল্পি দিয়ে আমরা তাদের। আমরা আমাদের সাথে যুক্ত করতেছি পবিত্র বাসায়। শহ্পনামের সাথে খুবই মিলবে ডেকিছাটা চাল।

আপনি কোথা থেকে কেনা সাবধান এই চাল ?

খাঁটি চুজু চাল যেখে পাবেন ধানের ভোগ। যেখে চুজু চালও পাবা যায়। জঙ্গু চোখ থেকে যুক্ত করতেই চাল।এই চাল রান্নাও সন্দেহের বাইরেও পুষ্টি উপাদান বা সাবধান । যৌগিক সমস্য দানে নেই।

প্রতি ১০০ গ্রাম এই চালে পাবেন:
১. জলীয় অংশ•১২.৬০ গ্রাম
২. আমিষ-৩৯.৪ গ্রাম
৩. শ্বাসকৃত (কার্বোহাইড্রেট)-৫৯৬ গ্রাম
৪. আঁশ-১৮.৫ গ্রাম
৫. চর্বি-০.৬ গ্রাম
৬. শর্করা-৭৭.৪ গ্রাম
৭. ক্যালসিয়াম-১০ মিলি গ্রাম
৮. লৌহ-২.৮ গ্রাম
৯. ক্যারোটিন-৯ মাইক্রোগ্রাম`,
  price: {
    min: 125.0,
    max: 3125.0,
  },
  sizes: [
    { size: "1kg", price: 125.0 },
    { size: "5kg", price: 625.0 },
    { size: "25kg", price: 3125.0 },
  ],
  image:
    "https://shondhibazar.com/wp-content/uploads/2022/01/dekicata-cal-1-300x225.jpg",
  category: "Rice (চাল)",
  relatedProducts: [
    {
      id: 2,
      name: "জিংক সমৃদ্ধ চাল(২৫ কেজি) [Zink Rice]",
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
      name: "নাজিরশাইল চাল [Nazirshail Rice]",
      price: { min: 90.0, max: 2250.0 },
      sizes: [
        { size: "1kg", price: 90.0 },
        { size: "5kg", price: 450.0 },
        { size: "25kg", price: 2250.0 },
      ],
      image:
        "https://shondhibazar.com/wp-content/uploads/2021/06/nazirshail-rice-1-300x225.webp",
    },
  ],
};

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  const cartItems = useSelector((state) => state.products.cart);
  const cartItem = cartItems.find(
    (item) => item.productId === product.id && item.size === selectedSize
  );

  const getCurrentPrice = () => {
    if (!selectedSize) {
      const defaultSize = product?.sizes[0];
      return defaultSize ? defaultSize.price * quantity : null;
    }
    const sizeOption = product.sizes.find((s) => s.size === selectedSize);
    return sizeOption ? sizeOption.price * quantity : null;
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
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
    } else {
      alert("Please select a size first");
    }
  };

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
            {selectedWeight
              ? `${getCurrentPrice()?.toFixed(2)}৳`
              : `${product.price.min.toFixed(2)}৳ - ${product.price.max.toFixed(
                  2
                )}৳`}
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
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md 
          transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>{cartItem ? "Update Cart" : "Add to Cart"}</span>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <TruckIcon size={20} className="text-gray-400" />
              <span>Flat shipping Rate All Over Dhaka</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <RefreshCcw size={20} className="text-gray-400" />
              <span>2 days easy returns</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Clock size={20} className="text-gray-400" />
              <span>
                Order yours before 2.30pm for same day dispatch (Uttara Only)
              </span>
            </div>
          </div>
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
          {product.relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
