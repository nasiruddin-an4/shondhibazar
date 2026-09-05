// Server component sibling to this route's client `page.jsx` — a page marked
// "use client" can't also export `generateMetadata`, but a layout.jsx for the
// same segment can, and it still receives the dynamic route's `params`. This
// is what gives each product its own title/description/OG image instead of
// every product sharing the site-wide default from the root layout.

function resolveMediaUrl(url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const origin = process.env.NEXT_PUBLIC_ROOT_URL || "";
  return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
}

async function fetchProduct(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/catalog/products/${slug}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return { title: "Product | ShondhiBazar" };
  }

  const title = `${product.name} | ShondhiBazar`;
  const description =
    product.short_description || product.description || `Buy ${product.name} online at ShondhiBazar.`;
  const primaryImage =
    product.images?.find((img) => img.is_primary)?.image_url || product.images?.[0]?.image_url;
  const imageUrl = resolveMediaUrl(primaryImage);

  return {
    title,
    description,
    alternates: { canonical: `/details/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://shondhibazar.com/details/${slug}`,
      type: "website",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default function ProductDetailLayout({ children }) {
  return children;
}
