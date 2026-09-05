export default function robots() {
  const baseUrl = "https://shondhibazar.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Account/transactional pages have nothing for a crawler to index and
      // shouldn't show up in search results.
      disallow: [
        "/checkout",
        "/profile",
        "/orders",
        "/orders/*",
        "/wishlist",
        "/login",
        "/register",
        "/forgot",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
