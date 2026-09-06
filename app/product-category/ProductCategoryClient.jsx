"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Filter } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "@/components/ProductCategory/ProductCard";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { categories } from "./categories";

function ProductGridContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [expandedCategory, setExpandedCategory] = useState(categoryParam || "All Products");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 86000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const itemsPerPage = 24;

  useEffect(() => {
    if (categoryParam) {
      setExpandedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const allProducts = useSelector((state) => state.products.products);

  const matchCategory = (product, catName) => {
    if (!catName || catName.toLowerCase() === "all products") return true;
    const catLower = catName.toLowerCase();

    // Check product.category (e.g. "RICE")
    if (product.category) {
      const pc = product.category.toLowerCase();
      if (pc === catLower || pc.includes(catLower) || catLower.includes(pc)) return true;
    }

    // Check product.categories array (e.g. ["CHICKEN & MEAT"])
    if (product.categories) {
      const match = product.categories.some(c => {
        const cl = c.toLowerCase();
        return cl === catLower || cl.includes(catLower) || catLower.includes(cl);
      });
      if (match) return true;
    }

    return false;
  };

  const getSubcategoryCount = (subName) => {
    return allProducts.filter(product => matchCategory(product, subName)).length;
  };

  const getCategoryCount = (category) => {
    if (category.name.toLowerCase() === "all products") return allProducts.length;
    return allProducts.filter(product => {
      if (matchCategory(product, category.name)) return true;
      if (category.subcategories) {
        return category.subcategories.some(sub => matchCategory(product, sub.name));
      }
      return false;
    }).length;
  };

  const products = allProducts.filter(product => {
    if (matchCategory(product, expandedCategory)) return true;

    // Also try to match subcategories if the expanded category matches a parent category
    if (expandedCategory) {
      const catLower = expandedCategory.toLowerCase();
      const categoryObj = categories.find(c =>
        c.name.toLowerCase() === catLower ||
        c.name.toLowerCase().includes(catLower) ||
        catLower.includes(c.name.toLowerCase())
      );
      if (categoryObj && categoryObj.subcategories) {
        return categoryObj.subcategories.some(sub => matchCategory(product, sub.name));
      }
    }
    return false;
  });

  const totalProducts = products.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));
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

  const renderPaginationControls = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <p className="text-sm text-gray-600">
        Showing {totalProducts === 0 ? 0 : startIndex + 1}–{endIndex} of {totalProducts} results
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
          <>
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
          </>
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

  const renderLoadingCards = () => (
    <>
      {Array.from({ length: itemsPerPage }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} isLoading={true} />
      ))}
    </>
  );

  const renderProductCards = () => (
    <>
      {products.slice(startIndex, endIndex).map((product) => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          isLoading={false}
        />
      ))}
    </>
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


        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        <aside
          className={`
            fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 p-6 overflow-y-auto transition-transform duration-300
            ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            lg:relative lg:translate-x-0 lg:w-64 lg:h-auto lg:p-0 lg:z-auto lg:overflow-visible lg:bg-transparent lg:block
          `}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="font-bold text-xl text-gray-800">Filters</h2>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-green-700">
              PRODUCT CATEGORIES
            </h2>
            <ul className="space-y-2">
              <>
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
                      ({getCategoryCount(category)})
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
                          <>
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
                                ({getSubcategoryCount(sub.name)})
                              </span>
                            </motion.li>
                          ))}
                          </>
                        </motion.ul>
                      )}
                  </AnimatePresence>
                </li>
              ))}
              </>
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
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700">
                  All Products
                </h1>
                {/* Mobile Sidebar Toggle Button */}
                <button
                  className="lg:hidden flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-md font-medium border border-green-200 transition-colors"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>
              {renderPaginationControls()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {isLoading ? renderLoadingCards() : renderProductCards()}
          </div>

          <div className="mt-12">
            {renderPaginationControls()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProductCategoryClient() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20">Loading products...</div>}>
      <ProductGridContent />
    </Suspense>
  );
}
