const BASE_URL = "https://shondhibazar.com";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/product-category", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about/story", changeFrequency: "yearly", priority: 0.4 },
  { path: "/about/artisan", changeFrequency: "monthly", priority: 0.4 },
  { path: "/about/contact-us", changeFrequency: "yearly", priority: 0.5 },
  { path: "/about/faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about/home-of-safe-food", changeFrequency: "yearly", priority: 0.4 },
  { path: "/about/jesmin-akhtar-neela", changeFrequency: "yearly", priority: 0.3 },
  { path: "/about/locations", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about/packaging", changeFrequency: "yearly", priority: 0.3 },
  { path: "/about/safe-food", changeFrequency: "yearly", priority: 0.4 },
  { path: "/buying-guide", changeFrequency: "yearly", priority: 0.4 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
];

async function fetchProductSlugs() {
  // GET /catalog/products caps `limit` at 100 per page, so paginate via `offset`
  // until a short page tells us we've reached the end.
  const PAGE_SIZE = 100;
  const slugs = [];
  try {
    for (let offset = 0; offset < 5000; offset += PAGE_SIZE) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/catalog/products?limit=${PAGE_SIZE}&offset=${offset}`,
        { next: { revalidate: 3600 } } // re-check hourly, not on every crawl
      );
      if (!res.ok) break;
      const json = await res.json();
      const page = json?.data || [];
      slugs.push(...page.map((p) => p.slug).filter(Boolean));
      if (page.length < PAGE_SIZE) break; // last page
    }
  } catch {
    // A partial/missing sitemap is far better than a broken build.
  }
  return slugs;
}

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const slugs = await fetchProductSlugs();
  const productEntries = slugs.map((slug) => ({
    url: `${BASE_URL}/details/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
