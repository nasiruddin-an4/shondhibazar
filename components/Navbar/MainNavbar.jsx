// components/layout/MainNavbar.jsx
"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingCart, ChevronDown, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import AuthModal from "@/components/Auth/AuthModal";
import ShortUserMenu from "@/components/Auth/ShortUserMenu";
import { useGetWishlistQuery, useGetCategoriesQuery } from "@/redux/API_Query/ecommerceApi";

// ─────────────────────────────────────────────────────────────────────
// Nav Group Configuration
// Matches the exact structure from the production site.
// ─────────────────────────────────────────────────────────────────────
const NAV_GROUPS = [

  {
    label: "Proteins & Dairy",
    keywords: ["chicken", "dairy", "dried fish", "fish", "meat", "egg", "seafood"],
  },
  {
    label: "Rice, Grains & Lentils",
    keywords: ["rice", "flour", "lentil", "চাল", "আটা", "ডাল"],
  },
  {
    label: "Spices & Seasonings",
    keywords: ["spice", "seasoning", "মসলা"],
    expandChildren: true,
  },
  {
    label: "Oils, Sugar & Honey",
    keywords: ["oil", "ghee", "honey", "sugar", "gurr"],
  },
  {
    label: "Pickles & Pantry",
    keywords: ["pickle", "dry food", "combo", "diet food", "canned", "আঁচার"],
  },
];

// Check if a category name matches any keyword in a group
function matchesGroup(categoryName, keywords) {
  const lower = categoryName.toLowerCase();
  return keywords.some((kw) => lower.includes(kw.toLowerCase()));
}

// Build the nav structure from API categories + config groups
function buildNavItems(apiCategories) {
  const used = new Set();
  const navItems = [];

  for (const group of NAV_GROUPS) {
    if (group.isLinkOnly) {
      navItems.push({
        label: group.label,
        items: [],
        isLinkOnly: true,
        link: group.link,
      });
      continue;
    }

    const matchedItems = [];

    for (const cat of apiCategories) {
      if (used.has(cat.name)) continue;
      if (!matchesGroup(cat.name, group.keywords)) continue;

      used.add(cat.name);

      // If this group wants children expanded and the category has children,
      // add the children as dropdown items + an "All {Category}" link
      if (group.expandChildren && cat.subcategories?.length > 0) {
        for (const child of cat.subcategories) {
          matchedItems.push({ name: child.name, id: child.id });
        }
        matchedItems.push({ name: `All ${cat.name}`, linkName: cat.name, id: `all-${cat.id}` });
      } else {
        matchedItems.push({ name: cat.name, id: cat.id });
      }
    }

    if (matchedItems.length > 0) {
      navItems.push({
        label: group.label,
        items: matchedItems,
      });
    }
  }

  // Collect unmatched categories → "More" (excluding "Uncategorized")
  const moreItems = apiCategories
    .filter((cat) => !used.has(cat.name) && cat.name.toLowerCase() !== "uncategorized")
    .map((cat) => ({ name: cat.name, id: cat.id }));

  return { navItems, moreItems };
}

// ─── Components ──────────────────────────────────────────────────────

const WishlistButton = ({ isSignedIn }) => {
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !isSignedIn });
  const count = wishlist?.items?.length || 0;
  return (
    <Link href="/wishlist" className="relative p-2 flex items-center justify-center group">
      <Heart size={24} className="text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

const CartButton = ({ onOpenCart, cartCount }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onOpenCart}
    className="relative p-2 flex items-center justify-center transition-all duration-300 group"
  >
    <ShoppingCart
      size={24}
      className="text-gray-700 group-hover:text-green-600 transition-colors duration-300"
    />
    {cartCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-600 rounded-full">
        {cartCount}
      </span>
    )}
  </motion.button>
);

// ── A single nav group with hover dropdown ───────────────────────────
const NavGroup = ({ label, items, currentCategory, hoveredItem, setHoveredItem, isLinkOnly, link }) => {
  if (isLinkOnly) {
    return (
      <Link href={link}>
        <div
          className={`flex items-center space-x-1 py-4 cursor-pointer transition-colors text-sm font-medium whitespace-nowrap text-gray-700 hover:text-green-600`}
        >
          <span>{label}</span>
        </div>
      </Link>
    );
  }

  const isActive = items.some(
    (item) => (item.linkName || item.name) === currentCategory
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoveredItem(label)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div
        className={`flex items-center space-x-1 py-4 cursor-pointer transition-colors text-sm font-medium whitespace-nowrap ${isActive
          ? "text-green-600"
          : "text-gray-700 hover:text-green-600"
          }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${hoveredItem === label ? "rotate-180" : ""
            }`}
        />
      </div>

      {/* Active/hover underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hoveredItem === label || isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0 }}
      />

      {/* Dropdown */}
      <AnimatePresence>
        {hoveredItem === label && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 z-20 bg-white shadow-lg rounded-b-lg border border-t-0 border-gray-100 py-1.5 min-w-[220px]"
          >
            {items.map((item) => (
              <Link
                key={item.id || item.name}
                href={`/product-category?category=${encodeURIComponent(item.linkName || item.name)}`}
                className={`block px-4 py-2 text-sm transition-colors ${currentCategory === (item.linkName || item.name)
                  ? "text-green-700 font-medium bg-green-50"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── "More" overflow dropdown ─────────────────────────────────────────
const MoreDropdown = ({ items, currentCategory, hoveredItem, setHoveredItem }) => {
  if (items.length === 0) return null;

  const isActive = items.some((item) => item.name === currentCategory);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHoveredItem("__more__")}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div
        className={`flex items-center space-x-1 py-4 cursor-pointer transition-colors text-sm font-medium whitespace-nowrap ${isActive
          ? "text-green-600"
          : "text-gray-700 hover:text-green-600"
          }`}
      >
        <span>More</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${hoveredItem === "__more__" ? "rotate-180" : ""
            }`}
        />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hoveredItem === "__more__" || isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0 }}
      />

      <AnimatePresence>
        {hoveredItem === "__more__" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-20 bg-white shadow-lg rounded-b-lg border border-t-0 border-gray-100 py-1.5 min-w-[220px] max-h-[60vh] overflow-y-auto"
          >
            {items.map((item) => (
              <Link
                key={item.id || item.name}
                href={`/product-category?category=${encodeURIComponent(item.name)}`}
                className={`block px-4 py-2 text-sm transition-colors ${currentCategory === item.name
                  ? "text-green-700 font-medium bg-green-50"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Loading skeleton ─────────────────────────────────────────────────
const NavSkeleton = () => (
  <div className="flex items-center space-x-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="py-4">
        <div
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${80 + Math.random() * 50}px` }}
        />
      </div>
    ))}
  </div>
);

// ─── Main Navbar ─────────────────────────────────────────────────────
const MainNavbar = ({ onOpenCart }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get("category") : null;

  const cart = useSelector((state) => state.products.cart);
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { data: categoriesRes, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const allCategories = useMemo(() => categoriesRes?.data || [], [categoriesRes]);

  // Build grouped nav items from flat API categories
  const { navItems, moreItems } = useMemo(
    () => buildNavItems(allCategories),
    [allCategories]
  );

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isSticky && <div className="h-[52px] w-full" />}
      <motion.nav
        initial={false}
        animate={isSticky ? { y: [-100, 0] } : { y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`w-full bg-white border-b border-gray-200 z-50 ${isSticky ? "fixed top-0 left-0 shadow-md" : "relative"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo (sticky only) */}
            {isSticky && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mr-6 shrink-0"
              >
                <Link href="/">
                  <Image
                    src="/images/logo2.png"
                    alt="ShondhiBazar"
                    width={100}
                    height={32}
                    className="h-10 w-auto"
                  />
                </Link>
              </motion.div>
            )}

            {/* Category navigation */}
            {categoriesLoading ? (
              <NavSkeleton />
            ) : (
              <div className="flex items-center space-x-5">
                {navItems.map((group) => (
                  <NavGroup
                    key={group.label}
                    label={group.label}
                    items={group.items}
                    isLinkOnly={group.isLinkOnly}
                    link={group.link}
                    currentCategory={currentCategory}
                    hoveredItem={hoveredItem}
                    setHoveredItem={setHoveredItem}
                  />
                ))}

                <MoreDropdown
                  items={moreItems}
                  currentCategory={currentCategory}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                />
              </div>
            )}

            {/* Right: Auth, Wishlist, Cart */}
            <div className="flex items-center space-x-3">
              {!isSignedIn ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="py-2 px-4 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
              ) : (
                <ShortUserMenu />
              )}

              <WishlistButton isSignedIn={isSignedIn} />
              <CartButton
                cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                onOpenCart={onOpenCart}
              />
            </div>

            <AuthModal
              open={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default MainNavbar;
