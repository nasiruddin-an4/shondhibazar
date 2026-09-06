// Shared between page.jsx (server — needs the display/Bengali names for
// per-category metadata) and ProductCategoryClient.jsx (client — renders the
// filter sidebar). NOT the real category catalog: this is a hardcoded stand-in
// until this page is wired to the real `getCategories`/`getProducts({
// category_slug })` endpoints that already exist elsewhere in the app.
export const categories = [
  { name: "All Products", count: 133 },
  { name: "Storage and carry", count: 6 },
  { name: "chicken & Meat", count: 7 },
  { name: "Monthly Package", bengali: "মাসিক প্যাকেজ", count: 11 },
  { name: "পেঁয়াজ & অন্যান্য", english: "Onion & Others", count: 8 },
  { name: "Safe Mango", bengali: "নিরাপদ আম", count: 3 },
  { name: "Diet foods", count: 14 },
  { name: "Dairy & Eggs", count: 3 },
  { name: "Flour", bengali: "আটা", count: 7 },
  { name: "Oil & Ghee", bengali: "তেল ও ঘি", count: 8 },
  { name: "Honey, Sugar, Gurr", bengali: "মধু, চিনি, গুড়", count: 8 },
  { name: "Rice", bengali: "চাল", count: 16 },
  { name: "Lentil", bengali: "ডাল", count: 13 },
  { name: "Oil", bengali: "তেল", count: 4 },
  {
    name: "Spices",
    bengali: "মসলা",
    count: 56,
    subcategories: [
      { name: "Spices Paste", bengali: "পেস্ট মসলা", count: 5 },
      { name: "Spice Powder", bengali: "গুড়া মসলা", count: 16 },
      { name: "Whole Spices", bengali: "গোটা মসলা", count: 27 },
    ],
  },
  { name: "Pickles", bengali: "আচার", count: 13 },
  { name: "Dried Fish", bengali: "শুঁটকি", count: 7 },
  { name: "Dry Food", count: 29 },
];
