"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCategory/ProductCard";
import { useSelector } from "react-redux";

const categories = [
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
  { name: "All Products", count: 133 },
];

export default function ProductGrid() {
  const [expandedCategory, setExpandedCategory] = useState("Spices");
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 86000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const itemsPerPage = 24;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const products = useSelector((state) => state.products.products);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);

  const toggleCategory = (categoryName) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  const handleSort = (value) => {
    setSortBy(value);
    // Implement sorting logic here
    // You would typically dispatch a Redux action to sort products
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <p className="text-sm text-gray-600">
        Showing {startIndex + 1}–{endIndex} of {totalProducts} results
      </p>
      <div className="flex items-center gap-2">
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="border rounded-md px-3 py-1.5 text-sm bg-white hover:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="default">Default sorting</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${
                page === currentPage
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-green-500">
          Home
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">All Products</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-6">
          <div>
            <h2 className="font-semibold mb-4 text-green-700">
              PRODUCT CATEGORIES
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className={`
                  ${
                    expandedCategory === category.name && category.subcategories
                      ? "border-l-2 border-green-500 pl-2"
                      : ""
                  }
                `}
                >
                  <div className="flex items-start group">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex-1 text-left text-sm py-1 hover:text-green-600"
                    >
                      <span>{category.name}</span>
                      {category.bengali && (
                        <span className="text-gray-600">
                          {" "}
                          ({category.bengali})
                        </span>
                      )}
                      {category.english && (
                        <span className="text-gray-600">
                          {" "}
                          ({category.english})
                        </span>
                      )}
                    </button>
                    <span className="text-gray-500 text-sm">
                      ({category.count})
                    </span>
                  </div>
                  <AnimatePresence>
                    {category.subcategories &&
                      expandedCategory === category.name && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-1 space-y-1"
                        >
                          {category.subcategories.map((sub) => (
                            <motion.li
                              key={sub.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-start"
                            >
                              <Link
                                href="#"
                                className="flex-1 text-sm text-gray-600 hover:text-green-600 py-1"
                              >
                                {sub.name}
                                {sub.bengali && (
                                  <span className="text-gray-500">
                                    {" "}
                                    ({sub.bengali})
                                  </span>
                                )}
                              </Link>
                              <span className="text-gray-500 text-sm">
                                ({sub.count})
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-green-700">
              FILTER BY PRICE
            </h2>
            <div className="space-y-4">
              <input
                type="range"
                className="w-full accent-green-500"
                min="0"
                max="86000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              />
              <div className="flex items-center gap-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-colors">
                  Filter
                </button>
                <span className="text-sm">
                  Price: ৳{priceRange[0]} — ৳{priceRange[1]}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-green-700">
                All Products
              </h1>
              <PaginationControls />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                  <ProductCard key={i} isLoading={true} />
                ))
              : products
                  .slice(startIndex, endIndex)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isLoading={false}
                    />
                  ))}
          </div>

          <div className="mt-12">
            <PaginationControls />
          </div>
        </main>
      </div>
    </div>
  );
}
