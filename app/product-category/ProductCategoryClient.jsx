"use client";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ArrowUpDown, X, PackageSearch, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "@/components/ProductCategory/ProductCard";
import { Suspense } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/API_Query/ecommerceApi";

// Windowed page list with "…" gaps, e.g. [1, "…", 4, 5, 6, "…", 12] — keeps the
// pager usable when there are many pages instead of a wall of number buttons.
function getPageList(current, total, delta = 1) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    }
  }
  const withGaps = [];
  let prev;
  for (const page of pages) {
    if (prev !== undefined) {
      if (page - prev === 2) withGaps.push(prev + 1);
      else if (page - prev > 2) withGaps.push("…");
    }
    withGaps.push(page);
    prev = page;
  }
  return withGaps;
}

function ProductGridContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [expandedCategory, setExpandedCategory] = useState(categoryParam || "All Products");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 86000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const itemsPerPage = 24;

  // Fetch categories from the API
  const { data: categoriesRes, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const apiCategories = useMemo(() => categoriesRes?.data || [], [categoriesRes]);

  // Build the sidebar list: "All Products" + API categories
  const sidebarCategories = useMemo(() => {
    return [{ id: "all", name: "All Products" }, ...apiCategories];
  }, [apiCategories]);

  // Find the category (or subcategory) node matching the selected name.
  const selectedCategoryMeta = useMemo(() => {
    if (!expandedCategory || expandedCategory.toLowerCase() === "all products") return null;
    let found = apiCategories.find((c) => c.name === expandedCategory);
    if (!found) {
      for (const cat of apiCategories) {
        if (cat.subcategories) {
          found = cat.subcategories.find((sub) => sub.name === expandedCategory);
          if (found) break;
        }
      }
    }
    return found || null;
  }, [expandedCategory, apiCategories]);

  // The products endpoint only ever returns the current page, with no total-count
  // field — so page count can't come from it directly. Category `product_count`
  // totals (already fetched for the sidebar) give an accurate total instead.
  const allProductsCount = useMemo(() => {
    return apiCategories.reduce((sum, cat) => {
      const subSum = (cat.subcategories || []).reduce((s, sub) => s + (sub.product_count || 0), 0);
      return sum + (cat.product_count || 0) + subSum;
    }, 0);
  }, [apiCategories]);

  // Build query params for the product fetch
  const productQueryParams = useMemo(() => {
    const params = { limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage };
    if (selectedCategoryMeta) {
      params.category_slug = selectedCategoryMeta.slug;
    } else if (expandedCategory && expandedCategory.toLowerCase() !== "all products") {
      // Fallback if not found in the category list (shouldn't happen)
      params.category_slug = expandedCategory;
    }
    if (sortBy === "price_asc") params.sort = "price_asc";
    else if (sortBy === "price_desc") params.sort = "price_desc";
    else if (sortBy === "name_asc") params.sort = "name_asc";
    else if (sortBy === "name_desc") params.sort = "name_desc";
    return params;
  }, [expandedCategory, selectedCategoryMeta, currentPage, sortBy, itemsPerPage]);

  // Fetch products from the API (server-side filtering)
  const { data: productsRes, isLoading: productsLoading, isFetching } = useGetProductsQuery(productQueryParams);

  // The API may return { data: [...], total: N } or just an array
  const products = useMemo(() => {
    if (!productsRes) return [];
    if (Array.isArray(productsRes)) return productsRes;
    return productsRes.data || [];
  }, [productsRes]);

  const totalProducts = useMemo(() => {
    // Categories haven't loaded yet — fall back to whatever the products response says
    // (usually just this page's length) until we have real counts to use.
    if (categoriesLoading) {
      if (!productsRes) return 0;
      if (Array.isArray(productsRes)) return productsRes.length;
      return productsRes.total ?? productsRes.data?.length ?? 0;
    }
    if (selectedCategoryMeta) return selectedCategoryMeta.product_count ?? products.length;
    return allProductsCount || products.length;
  }, [categoriesLoading, selectedCategoryMeta, allProductsCount, productsRes, products.length]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));

  useEffect(() => {
    if (categoryParam) {
      setExpandedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  const toggleCategory = (categoryName) => {
    const next = expandedCategory === categoryName ? "All Products" : categoryName;
    setExpandedCategory(next);
    setCurrentPage(1);
    // Keep the URL's ?category= in sync so the navbar's active-highlight (which
    // reads it via useSearchParams) reflects sidebar selections too, not just
    // navigation from the navbar itself.
    router.replace(`/product-category?category=${encodeURIComponent(next)}`, { scroll: false });
  };

  const handleSort = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLoading = productsLoading || categoriesLoading;
  const showSkeletons = isLoading || isFetching;

  // Results count + sort — a single compact row on every screen size, instead
  // of a "Showing X–Y of Z" line that pushed sort/pagination onto a second row
  // and ate vertical space on mobile.
  const renderResultsAndSort = () => (
    <div className="flex items-center justify-between gap-3 w-full">
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-800">{totalProducts}</span> results
      </p>
      <div className="relative shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="appearance-none pl-8 pr-7 py-1.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 hover:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors"
        >
          <option value="default">Default sorting</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );

  // Page navigation — kept separate from results/sort so it can be reused at
  // the bottom of the grid (the primary way to move pages once you've scrolled
  // past the top bar) without repeating the sort control there too.
  const renderPager = () => {
    if (totalPages <= 1) return null;
    const pageList = getPageList(currentPage, totalPages);

    return (
      <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Compact indicator for narrow screens */}
        <span className="sm:hidden px-2 text-sm text-gray-600 font-medium whitespace-nowrap">
          {currentPage} / {totalPages}
        </span>

        {/* Full windowed page list */}
        <div className="hidden sm:flex items-center gap-1">
          {pageList.map((page, i) =>
            page === "…" ? (
              <span
                key={`gap-${i}`}
                className="w-8 h-8 flex items-center justify-center text-sm text-gray-400 select-none"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="h-9 w-9 sm:h-8 sm:w-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    );
  };

  const renderLoadingCards = () => (
    <>
      {Array.from({ length: itemsPerPage }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} isLoading={true} index={i} />
      ))}
    </>
  );

  const renderProductCards = () => (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          isLoading={false}
          index={index}
        />
      ))}
    </>
  );

  // Sidebar category skeleton
  const renderCategorySkeleton = () => (
    <ul className="space-y-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i} className="flex items-start">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse my-1" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <nav className="hidden sm:flex items-center gap-1.5 mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600 transition-colors">
          Home
        </Link>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <span className="text-gray-800 font-medium">
          {expandedCategory && expandedCategory !== "All Products" ? expandedCategory : "All Products"}
        </span>
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
            lg:translate-x-0 lg:w-64 lg:shrink-0 lg:h-auto lg:p-0 lg:z-auto lg:bg-transparent lg:block
            lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto
          `}
        >
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="font-bold text-xl text-gray-800">Filters</h2>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-wide uppercase">
              Product Categories
            </h2>
            {categoriesLoading ? renderCategorySkeleton() : (
              <ul className="space-y-0.5">
                {sidebarCategories.map((category) => (
                  <li key={category.id || category.name}>
                    <div
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 group transition-colors ${
                        expandedCategory === category.name
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className={`flex-1 text-left text-sm truncate ${
                          expandedCategory === category.name ? "text-green-700 font-semibold" : "text-gray-700"
                        }`}
                      >
                        <span>{category.name}</span>
                        {category.name_bn && (
                          <span className="text-gray-500 font-normal">
                            {" "}({category.name_bn})
                          </span>
                        )}
                      </button>
                      {category.product_count != null && (
                        <span
                          className={`text-xs shrink-0 ml-2 ${
                            expandedCategory === category.name ? "text-green-600" : "text-gray-400"
                          }`}
                        >
                          {category.product_count}
                        </span>
                      )}
                    </div>
                    <AnimatePresence>
                      {category.subcategories?.length > 0 &&
                        expandedCategory === category.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-3 mt-0.5 space-y-0.5 border-l border-gray-100 pl-2"
                          >
                            {category.subcategories.map((sub) => (
                              <motion.li
                                key={sub.id || sub.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                                  expandedCategory === sub.name ? "bg-green-50" : "hover:bg-gray-50"
                                }`}
                              >
                                <button
                                  onClick={() => toggleCategory(sub.name)}
                                  className={`flex-1 text-sm text-left truncate ${
                                    expandedCategory === sub.name ? "text-green-700 font-semibold" : "text-gray-600"
                                  }`}
                                >
                                  {sub.name}
                                  {sub.name_bn && (
                                    <span className="text-gray-500 font-normal">
                                      {" "}({sub.name_bn})
                                    </span>
                                  )}
                                </button>
                                {sub.product_count != null && (
                                  <span
                                    className={`text-xs shrink-0 ml-2 ${
                                      expandedCategory === sub.name ? "text-green-600" : "text-gray-400"
                                    }`}
                                  >
                                    {sub.product_count}
                                  </span>
                                )}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 pt-5 border-t border-gray-100">
              <h2 className="text-xs font-bold mb-4 text-gray-500 tracking-wide uppercase">
                Filter by Price
              </h2>
              <div className="space-y-3">
                <input
                  type="range"
                  className="w-full accent-green-500"
                  min="0"
                  max="86000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-500">
                    ৳{priceRange[0]} — ৳{priceRange[1]}
                  </span>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex justify-between items-center gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {expandedCategory && expandedCategory !== "All Products" ? expandedCategory : "All Products"}
                </h1>
                {/* Mobile Sidebar Toggle Button */}
                <button
                  className="lg:hidden flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-lg font-medium border border-green-200 transition-colors shrink-0"
                  onClick={() => setIsMobileSidebarOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:px-4 sm:py-3">
                {renderResultsAndSort()}
                {totalPages > 1 && (
                  <div className="hidden sm:flex justify-end mt-3 pt-3 border-t border-gray-100">
                    {renderPager()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6">
            {showSkeletons ? renderLoadingCards() : renderProductCards()}
          </div>

          {products.length === 0 && !showSkeletons && (
            <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
              <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <PackageSearch className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-lg text-gray-700 font-medium">No products found in this category.</p>
              <p className="text-sm text-gray-500 mt-1">Try browsing a different category or clearing filters.</p>
              <button
                onClick={() => toggleCategory("All Products")}
                className="mt-5 inline-flex items-center px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
              >
                Browse all products
              </button>
            </div>
          )}

          {(products.length > 0 || showSkeletons) && totalPages > 1 && (
            <div className="mt-8 sm:mt-10 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
              {renderPager()}
            </div>
          )}
        </main>
      </div>
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
