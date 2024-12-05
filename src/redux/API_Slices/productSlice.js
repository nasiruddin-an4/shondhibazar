// store/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
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
  ],
  selectedSize: {},
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectSize: (state, action) => {
      const { productId, size } = action.payload;
      state.selectedSize[productId] = size;
    },
    addToCart: (state, action) => {
      const { productId, size, quantity } = action.payload;

      // Check if item already exists in cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        state.cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        state.cart.push({
          productId,
          size,
          quantity,
          price: state.products
            .find((p) => p.id === productId)
            .sizes.find((s) => s.size === size).price,
        });
      }
    },
  },
});

export const { selectSize, addToCart } = productSlice.actions;
export default productSlice.reducer;
