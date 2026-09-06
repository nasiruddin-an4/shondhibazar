// Server component — `searchParams` (the `?category=` filter) is only
// readable in a page.js segment, never in layout.js (per Next's own docs:
// node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md).
// That rules out the layout.jsx + params trick this app uses for
// `/details/[slug]` (a path param, not a query string). The actual filtering
// UI stays exactly as it was, just moved into ProductCategoryClient.jsx so
// this file can stay a server component and read searchParams.
import { categories } from "./categories";
import ProductCategoryClient from "./ProductCategoryClient";

const SITE_NAME = "ShondhiBazar";
const DEFAULT_TITLE = `Shop All Products | ${SITE_NAME}`;
const DEFAULT_DESCRIPTION =
  "Browse fresh produce, groceries, and artisan products from ShondhiBazar — filter by category, price, and more.";

function resolveCategoryDisplay(categoryParam) {
  if (!categoryParam || categoryParam.toLowerCase() === "all products") return null;

  const catLower = categoryParam.toLowerCase();
  const match = categories.find((c) => c.name.toLowerCase() === catLower);
  const name = match?.name || categoryParam;
  const bengali = match?.bengali ? ` (${match.bengali})` : "";
  return `${name}${bengali}`;
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const rawCategory = Array.isArray(params?.category) ? params.category[0] : params?.category;
  const display = resolveCategoryDisplay(rawCategory);

  if (!display) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      alternates: { canonical: "/product-category" },
      openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: "https://shondhibazar.com/product-category",
      },
    };
  }

  const title = `${display} | ${SITE_NAME}`;
  const description = `Shop ${display} at ${SITE_NAME} — fresh produce, groceries, and artisan products, delivered.`;
  const canonicalPath = `/product-category?category=${encodeURIComponent(rawCategory)}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: `https://shondhibazar.com${canonicalPath}`,
    },
  };
}

export default function ProductCategoryPage() {
  return <ProductCategoryClient />;
}
