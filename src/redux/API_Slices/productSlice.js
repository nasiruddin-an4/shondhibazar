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
      description: `কভিডের এই সময়ে রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি এবং সেই সাথে পুষ্টি নিশ্চিত করতে সন্ধি নিয়ে এলো জিংক সমৃদ্ধ চাল । এই চাল যেমন চিকন , তেমনি পুষ্টিকর । আর জিংক ওষুধ খেতে হবে না , ভাতের সাথেই এর প্রাপ্তি নিশ্চিত করবে সন্ধির জিংক সমৃদ্ধ চাল ।

মানবদেহের প্রয়োজনীয় পুষ্টি উপাদানের মধ্যে জিংক একটি অত্যাবশ্যকীয় গৌণ উপাদান, যা দেহের বৃদ্ধি, গঠন ও রোগ প্রতিরোধ ক্ষমতা বাড়ায় যা এই কভিডের সময় আরো বেশি গুরুত্বপূর্ণ । দেহের শর্করা ও চর্বির বিপাক ক্রিয়ায় জিঙ্ক গুরুত্বপূর্ণ ভূমিকা পালন করে । পর্যাপ্ত পরিমাণে জিঙ্ক গ্রহণ না করলে শিশুদের খর্বাকৃতি ও দুর্বল হওয়ার সম্ভাবনা থাকে। জিংকের অভাবে ডায়রিয়া ও নিউমোনিয়া হলে মারাত্মক আকার ধারণ করে, অনেক সময় মৃত্যুও হতে পারে।

গবেষণায় দেখা গেছে, স্বল্প মাত্রার দীর্ঘ সময় ধরে জিঙ্ক গ্রহণ অধিক হারে স্বল্প সময়ে জিঙ্ক গ্রহণের চেয়ে বেশি কার্যকরী। ব্রি উদ্ভাবিত ব্রিধান ৮৪ জিঙ্কসমৃদ্ধ ধান যা শিশু ও গর্ভবতীর শরীরে জিংক চাহিদার ৪০ % পূরণ করবে । শরিয়তপুরের প্রান্তিক চাষীর ক্ষেত থেকে সংগৃহিত এই চালটা দেখতে সামান্য লালচে তবে লম্বাটে ও চিকন । গর্ভবতী, হৃদরোগী, ডায়াবেটিক রোগী এবং উচ্চ রক্তচাপের রোগীদের জন্য এই চালের ভাত বিশেষ উপযোগী । প্রতি কেজি চালে ২৭.৬ মিলিগ্রাম জিংক , ৯.৭ % প্রোটিন , ১০.১ মিলিগ্রাম আয়রণ বিদ্যমান । তাই সন্ধির জিঙ্কসমৃদ্ধ চাল খান এবং প্রতিদিনের খাদ্যনিরাপত্তার সাথে পুষ্টিনিরাপত্তাও নিশ্চিত করুন ।`,
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
      description: `সন্ধির ঘী সন্তানের পাতে দিলে আর লাগে কী ? আমাদের ঘী প্রকৃতির মতোই বিশুদ্ধ । ৪০ লিটার খাঁটি দুধের ননী থেকে সন্ধির ১ লিটার ঘী তৈরী হয় । কোন ধরনের essence বা food colour ব্যবহার করা হয় নি। আপনার সুস্বাস্হ্যের জন্য নিশ্চিন্তে বিশ্বাস রাখুন আমাদের ঘী তে।

ঘি – নাম শুনলেই যেন মনটা ভরে যায়। গরম ভাতে একটু ঘি হলেই যেন পুরো ভাতটা নিমিষেই খাওয়া হয়ে যায়।ভাতের সঙ্গে ঘি মিশিয়ে খেলে শরীরে দীর্ঘক্ষণ শক্তি থাকে। ঘি এর ব্যবহার সেই প্রাচীনকাল থেকেই চলে আসছে। বিশেষ কিছু খাবারের স্বাদ বাড়াতে যেমন কাচ্চি বিরিয়ানীসহ আরো অন্যান্য খাবার তৈরিতে ঘিয়ের প্রয়োজন হয়।`,
      image:
        "https://shondhibazar.com/wp-content/uploads/2020/09/ghee-03-300x225.webp",
      discount: 5,
    },
    {
      id: 4,
      name: "প্রিমিয়াম গাঁওয়া ঘি [Ghee]",
      categories: ["ALL PRODUCTS", "DIET FOODS", "OIL & GHEE"],
      price: { min: 450.0, max: 1600.0 },
      sizes: [
        { size: "250gm", price: 450.0 },
        { size: "500gm", price: 900.0 },
        { size: "1kg", price: 1600.0 },
      ],
      description: `সন্ধির ঘী সন্তানের পাতে দিলে আর লাগে কী ? আমাদের ঘী প্রকৃতির মতোই বিশুদ্ধ । ৪০ লিটার খাঁটি দুধের ননী থেকে সন্ধির ১ লিটার ঘী তৈরী হয় । কোন ধরনের essence বা food colour ব্যবহার করা হয় নি। আপনার সুস্বাস্হ্যের জন্য নিশ্চিন্তে বিশ্বাস রাখুন আমাদের ঘী তে।

ঘি – নাম শুনলেই যেন মনটা ভরে যায়। গরম ভাতে একটু ঘি হলেই যেন পুরো ভাতটা নিমিষেই খাওয়া হয়ে যায়।ভাতের সঙ্গে ঘি মিশিয়ে খেলে শরীরে দীর্ঘক্ষণ শক্তি থাকে। ঘি এর ব্যবহার সেই প্রাচীনকাল থেকেই চলে আসছে। বিশেষ কিছু খাবারের স্বাদ বাড়াতে যেমন কাচ্চি বিরিয়ানীসহ আরো অন্যান্য খাবার তৈরিতে ঘিয়ের প্রয়োজন হয়।`,
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
      description: `পাওয়া ঘি (Ghee) একটি মানসম্মত ঘি যা মসৃণ ও ঘন। এটি প্রতিদিনের রান্না এবং স্বাস্থ্যকর খাদ্যের জন্য উপযুক্ত।`,
      image:
        "https://shondhibazar.com/wp-content/uploads/2021/06/ghee04-300x225.webp",
      discount: 7,
    },
    {
      id: 6,
      name: "সরষে খাঁটি ভাঙ্গা সরিষার তেল [Extra Virgin Mustard Oil]",
      categories: ["ALL PRODUCTS", "OIL", "OIL & GHEE"],
      price: { min: 135.0, max: 2300.0 },
      sizes: [
        { size: "225ml", price: 135.0 },
        { size: "1L", price: 460.0 },
        { size: "5L", price: 2300.0 },
      ],
      description: `খাঁটি সরিষার তেল (Extra Virgin Mustard Oil) সম্পূর্ণ ভাঙ্গা সরিষা থেকে তৈরি। এটি খাবারের স্বাদ বাড়ায় এবং স্বাস্থ্যকর রান্নার জন্য উপযুক্ত।`,
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
      description: `নিরাপদ মুরগীর মুরগী (Safe Broiler) তাজা এবং স্বাস্থ্যসম্মত। এটি সঠিকভাবে পরিস্কার এবং প্রক্রিয়াজাত করা, যাতে এটি সম্পূর্ণ নিরাপদ ও সুস্বাদু।`,
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
      description: `মরিচ গুঁড়া (Chili Powder) সম্পূর্ণ প্রাকৃতিক এবং বিশুদ্ধ। এটি রান্নায় ঝাল স্বাদ যোগ করার জন্য আদর্শ। কোনো প্রকার রাসায়নিক সংমিশ্রণ ছাড়াই তৈরি।`,
      image:
        "https://shondhibazar.com/wp-content/uploads/2021/03/morich-04-300x225.webp",
    },
    // {
    //   id: 9,
    //   name: "কালোজিরা চাল [Kalojira Rice]",
    //   category: "RICE",
    //   price: { min: 150.0, max: 3750.0 },
    //   sizes: [
    //     { size: "1kg", price: 150.0 },
    //     { size: "5kg", price: 750.0 },
    //     { size: "25kg", price: 3750.0 },
    //   ],
    //   description: `কালোজিরা চাল (Kalojira Rice) একটি প্রিমিয়াম মানের সুগন্ধি চাল। এটি বিশেষত পোলাও এবং অন্যান্য উৎসবমুখী রান্নার জন্য উপযুক্ত। প্রতিটি দানা সুষম আকারের এবং দারুণ সুবাসমণ্ডিত। এ চালের পুষ্টি উপাদান সমৃদ্ধ ও স্বাস্থ্যকর।`,
    //   image: "https://example.com/kalojira-rice.jpg",
    // },
    // {
    //   id: 10,
    //   name: "কৃষক চাল [Farmer's Rice]",
    //   category: "RICE",
    //   price: { min: 130.0, max: 3250.0 },
    //   sizes: [
    //     { size: "1kg", price: 130.0 },
    //     { size: "5kg", price: 650.0 },
    //     { size: "25kg", price: 3250.0 },
    //   ],
    //   description: `কৃষক চাল (Farmer's Rice) সরাসরি কৃষকের কাছ থেকে সংগ্রহ করা হয়। এটি কোনো প্রকার রাসায়নিক প্রক্রিয়াজাত ছাড়াই সম্পূর্ণ প্রাকৃতিকভাবে প্রস্তুত।`,
    //   image: "https://example.com/farmers-rice.jpg",
    // },
    // {
    //   id: 11,
    //   name: "চিনি [Sugar]",
    //   categories: ["ALL PRODUCTS", "SUGAR & SALT"],
    //   price: { min: 80.0, max: 400.0 },
    //   sizes: [
    //     { size: "500gm", price: 80.0 },
    //     { size: "1kg", price: 160.0 },
    //     { size: "5kg", price: 400.0 },
    //   ],
    //   description: `বিশুদ্ধ চিনি (Sugar), যা প্রতিদিনের ব্যবহার ও বিভিন্ন মিষ্টি তৈরিতে ব্যবহৃত হয়। এ চিনি কোনো প্রকার অশুদ্ধি বা অতিরিক্ত রাসায়নিক পদার্থ ছাড়াই প্রক্রিয়াজাত।`,
    //   image: "https://example.com/sugar.jpg",
    // },
    // {
    //   id: 12,
    //   name: "লবণ [Salt]",
    //   categories: ["ALL PRODUCTS", "SUGAR & SALT"],
    //   price: { min: 20.0, max: 100.0 },
    //   sizes: [
    //     { size: "500gm", price: 20.0 },
    //     { size: "1kg", price: 40.0 },
    //     { size: "5kg", price: 100.0 },
    //   ],
    //   description: `আইডাইজড লবণ (Salt), যা রান্নার জন্য অপরিহার্য। আমাদের লবণ স্বাস্থ্যের জন্য উপযোগী এবং সঠিক পদ্ধতিতে প্রক্রিয়াজাত করা।`,
    //   image: "https://example.com/salt.jpg",
    // },
    // {
    //   id: 13,
    //   name: "সরিষার তেল [Mustard Oil]",
    //   categories: ["OIL & GHEE"],
    //   price: { min: 150.0, max: 1200.0 },
    //   sizes: [
    //     { size: "250ml", price: 150.0 },
    //     { size: "500ml", price: 300.0 },
    //     { size: "1L", price: 600.0 },
    //     { size: "2L", price: 1200.0 },
    //   ],
    //   description: `খাঁটি সরিষার তেল (Mustard Oil), যা রান্না ও ঘরোয়া ব্যবহার উভয়ের জন্যই উপযুক্ত। এটি স্বাস্থ্যের জন্য অত্যন্ত উপকারী এবং প্রাকৃতিকভাবে প্রস্তুত।`,
    //   image: "https://example.com/mustard-oil.jpg",
    // },
    // {
    //   id: 14,
    //   name: "আমের আচার [Mango Pickle]",
    //   categories: ["SPICES", "PICKLES"],
    //   price: { min: 200.0, max: 800.0 },
    //   sizes: [
    //     { size: "250gm", price: 200.0 },
    //     { size: "500gm", price: 400.0 },
    //     { size: "1kg", price: 800.0 },
    //   ],
    //   description: `স্বাদের সেরা আমের আচার (Mango Pickle), যা ঘরে তৈরি এবং সম্পূর্ণ প্রাকৃতিক উপাদান দিয়ে প্রস্তুত। প্রতিটি বয়ামে থাকবে আমের অনন্য টক-মিষ্টি স্বাদ।`,
    //   image: "https://example.com/mango-pickle.jpg",
    // },
    // {
    //   id: 15,
    //   name: "মধু [Honey]",
    //   categories: ["ALL PRODUCTS", "HEALTH & WELLNESS"],
    //   price: { min: 250.0, max: 1000.0 },
    //   sizes: [
    //     { size: "250gm", price: 250.0 },
    //     { size: "500gm", price: 500.0 },
    //     { size: "1kg", price: 1000.0 },
    //   ],
    //   description: `বিশুদ্ধ মধু (Honey), যা সরাসরি মৌচাক থেকে সংগ্রহ করা হয়। এটি প্রাকৃতিক এবং সম্পূর্ণ রাসায়নিকমুক্ত। মধু স্বাস্থ্যের জন্য অত্যন্ত উপকারী।`,
    //   image: "https://example.com/honey.jpg",
    // },
    // {
    //   id: 16,
    //   name: "কৃষি ডিম [Farm Fresh Eggs]",
    //   categories: ["CHICKEN & MEAT"],
    //   price: { min: 120.0, max: 480.0 },
    //   sizes: [
    //     { size: "6pcs", price: 120.0 },
    //     { size: "12pcs", price: 240.0 },
    //     { size: "24pcs", price: 480.0 },
    //   ],
    //   description: `কৃষি ডিম (Farm Fresh Eggs) সরাসরি ফার্ম থেকে সংগৃহীত এবং উচ্চ পুষ্টিমান সম্পন্ন। প্রতিটি ডিমে থাকবে প্রাকৃতিক স্বাদ।`,
    //   image: "https://example.com/farm-eggs.jpg",
    // },
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
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (existingItemIndex >= 0) {
        state.cart[existingItemIndex].quantity += quantity;
      } else {
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
    updateCartQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.productId === productId && item.size === size
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.cart.splice(itemIndex, 1);
        } else {
          state.cart[itemIndex].quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
    },
  },
});

export const { selectSize, addToCart, updateCartQuantity, removeFromCart } =
  productSlice.actions;
export default productSlice.reducer;
