// See app/details/[slug]/layout.jsx for why a route with a "use client" page
// gets its metadata from a sibling layout instead.
export const metadata = {
  title: "Shop All Products | ShondhiBazar",
  description:
    "Browse fresh produce, groceries, and artisan products from ShondhiBazar — filter by category, price, and more.",
  alternates: { canonical: "/product-category" },
  openGraph: {
    title: "Shop All Products | ShondhiBazar",
    description:
      "Browse fresh produce, groceries, and artisan products from ShondhiBazar — filter by category, price, and more.",
    url: "https://shondhibazar.com/product-category",
  },
};

export default function ProductCategoryLayout({ children }) {
  return children;
}
