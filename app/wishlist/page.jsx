"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/redux/API_Query/ecommerceApi";
import { addToCart } from "@/redux/API_Slices/productSlice";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import AuthModal from "@/components/Auth/AuthModal";

export default function WishlistPage() {
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { data: wishlist, isLoading } = useGetWishlistQuery(undefined, { skip: !isSignedIn });
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  // The wishlist API only returns {id, product_variant_id} pairs — product name/image/
  // price come from the full catalog already preloaded into Redux on app boot (the same
  // source the cart uses), matched by variant id.
  const items = (wishlist?.items || [])
    .map((item) => {
      for (const product of products || []) {
        const size = product.sizes?.find((s) => s.id === item.product_variant_id);
        if (size) {
          return { wishlistItemId: item.id, variantId: item.product_variant_id, product, size };
        }
      }
      return null;
    })
    .filter(Boolean);

  const handleRemove = async (variantId) => {
    try {
      await removeFromWishlist(variantId).unwrap();
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Couldn't remove that item"));
    }
  };

  const handleMoveToCart = async (product, size, variantId) => {
    dispatch(
      addToCart({ productId: product.id, variantId: size.id, size: size.size, quantity: 1 })
    );
    try {
      await removeFromWishlist(variantId).unwrap();
      toast.success("Moved to cart");
    } catch (err) {
      // The cart add already happened and matters more than this cleanup
      // step — don't turn a successful "add to cart" into an error toast.
      toast.success("Added to cart");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <Heart className="mx-auto mb-4 text-gray-300" size={48} />
        <h1 className="text-xl font-semibold mb-2">Sign in to see your wishlist</h1>
        <p className="text-gray-500 mb-6">Save products you love and find them here anytime.</p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 text-sm font-medium transition-colors"
        >
          Sign in
        </button>
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <div className="h-40 bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto mb-4 text-gray-300" size={48} />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link href="/product-category" className="text-green-600 hover:underline font-medium">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(({ wishlistItemId, variantId, product, size }) => (
            <div
              key={wishlistItemId}
              className="bg-white rounded-lg border border-gray-100 overflow-hidden relative hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleRemove(variantId)}
                disabled={isRemoving}
                aria-label="Remove from wishlist"
                className="absolute top-2 right-2 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors disabled:opacity-60"
              >
                <Trash2 size={16} className="text-gray-500" />
              </button>
              <Link href={`/details/${product.slug || product.id}`} className="block h-40 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="p-3">
                <Link
                  href={`/details/${product.slug || product.id}`}
                  className="block text-sm font-medium hover:text-green-600 transition-colors mb-1 truncate"
                >
                  {product.name}
                </Link>
                <p className="text-green-600 text-sm font-semibold mb-3">
                  {size.size} — {Number(size.price).toFixed(2)}৳
                </p>
                <button
                  onClick={() => handleMoveToCart(product, size, variantId)}
                  disabled={isRemoving}
                  className="w-full h-9 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60"
                >
                  <ShoppingCart size={14} />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
