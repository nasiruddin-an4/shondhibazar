// components/category/CategorySection.js
"use client";
import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useGetCategoriesQuery } from "@/redux/API_Query/ecommerceApi";

// A fixed, curated set of tiles for the homepage — not "the first 8 categories
// from the API" (which pulled in things like "combo products" / "Eid Collection").
// Each tile is matched to whichever live category (keyword, case-insensitive
// substring) best fits, so it still resolves correctly if the admin renames or
// reorders categories, or adds Bengali suffixes to them.
const TILES = [
  {
    label: "Rice & Grains",
    keywords: ["rice", "চাল"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M4 12c0-.5 3.5-1 8-1s8 .5 8 1-3.5 6-8 6-8-5.5-8-6z" strokeWidth="1.5" />
        <path d="M8 11.5c0-3 1.8-6 4-7.5m4 7.5c0-3-1.8-6-4-7.5" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    label: "Oil & Ghee",
    keywords: ["oil", "ghee", "তেল"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M10 3h4v3l2 2.5v11a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 018 19.5v-11L10 6V3z" strokeWidth="1.5" />
        <path d="M8.5 11h7" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Herbs & Spice",
    keywords: ["spice", "মশলা", "masala"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M8 8c-2 0-3.5 1.8-3.5 4S6 16.5 8.5 16.5c3.5 0 8-2.5 9-6C13.5 9.5 10.5 8 8 8z" strokeWidth="1.5" />
        <path d="M15.5 4.5c1 1 1.3 2.7.5 4" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    label: "Honey & Sugar",
    keywords: ["honey", "sugar", "gurr", "গুড়"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M12 2c2.5 3 4 6 4 8.5a4 4 0 01-8 0C8 8 9.5 5 12 2z" strokeWidth="1.5" />
        <path d="M9 15.5h6l-1 5.5h-4l-1-5.5z" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Eggs",
    keywords: ["egg", "dairy"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <ellipse cx="12" cy="12" rx="8" ry="6" strokeWidth="1.5" />
        <path d="M12 6c-2.2 0-4 2.7-4 6s1.8 6 4 6 4-2.7 4-6-1.8-6-4-6z" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Meat & Chicken",
    keywords: ["chicken", "meat"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M14.5 3.5c2.5 0 4.5 2 4.5 4.5 0 2.5-2 5-5 8-1 1-1.5 2.5-1.5 4" strokeWidth="1.5" />
        <path d="M9 15c-1.7 1.7-2.5 3-4.5 3.5-1 .25-1.75-.5-1.5-1.5.5-2 1.8-2.8 3.5-4.5" strokeWidth="1.5" />
        <path d="M8.5 15.5 15 9c1.5-1.5 1.5-4 0-5.5-1.4-1.4-3.5-1.5-5 0L4 9" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Fish & Dried Fish",
    keywords: ["fish", "seafood", "dried fish", "শুঁটকি"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M3 12s3.5-5 9-5 8 3.5 9 5c-1 1.5-3.5 5-9 5s-9-3.5-9-5z" strokeWidth="1.5" />
        <path d="M17.5 9.5L21 6m-3.5 9L21 18" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pickles",
    keywords: ["pickle", "আঁচার"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M8 4h8v3H8z" strokeWidth="1.5" />
        <path d="M6.5 7h11l1 12.5a1.5 1.5 0 01-1.5 1.5h-10a1.5 1.5 0 01-1.5-1.5L6.5 7z" strokeWidth="1.5" />
        <path d="M8 11h8M8.3 15h7.4" strokeWidth="1.3" />
      </svg>
    ),
  },
];

// Soft tint per tile so the row reads with some color variety.
const TILE_TINTS = [
  "bg-green-50 text-green-600 group-hover:bg-green-100",
  "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
  "bg-lime-50 text-lime-600 group-hover:bg-lime-100",
  "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
  "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
  "bg-fuchsia-50 text-fuchsia-600 group-hover:bg-fuchsia-100",
];

const CategorySkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100">
        <div className="w-14 h-14 md:w-16 md:h-16 mb-3 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
      </div>
    ))}
  </div>
);

const CategorySection = () => {
  const { data: categoriesRes, isLoading } = useGetCategoriesQuery();
  const apiCategories = useMemo(() => categoriesRes?.data || [], [categoriesRes]);

  const tiles = useMemo(() => {
    return TILES.map((tile) => {
      const match = apiCategories.find((cat) =>
        tile.keywords.some((kw) => cat.name.toLowerCase().includes(kw.toLowerCase()))
      );
      return {
        ...tile,
        href: match
          ? `/product-category?category=${encodeURIComponent(match.name)}`
          : "/product-category",
      };
    });
  }, [apiCategories]);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 md:gap-4">
            {tiles.map((tile, index) => (
              <motion.div
                key={tile.label}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Link href={tile.href} className="block group h-full">
                  <motion.div
                    className="flex flex-col items-center p-3 md:p-4 bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 mb-2.5 p-3 md:p-3.5 rounded-full transition-colors duration-300 ${
                        TILE_TINTS[index % TILE_TINTS.length]
                      }`}
                    >
                      {tile.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs md:text-sm text-center font-medium text-gray-800 group-hover:text-green-600 transition-colors whitespace-nowrap">
                      {tile.label}
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
