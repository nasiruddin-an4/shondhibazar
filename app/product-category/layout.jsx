// page.jsx (sibling, same segment) now owns this route's metadata via
// generateMetadata({ searchParams }) — it needs searchParams, which only a
// page.js can read, so there's nothing left for this layout to contribute.
export default function ProductCategoryLayout({ children }) {
  return children;
}
