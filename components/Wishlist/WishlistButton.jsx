"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import AuthModal from "@/components/Auth/AuthModal";

/**
 * A heart-icon toggle button for adding/removing a product variant from the
 * signed-in user's wishlist. Prompts login for a guest instead of calling the API
 * (the backend's wishlist endpoints require auth). Safe to drop onto a product
 * card or the product detail page — it only needs the target variantId.
 */
export default function WishlistButton({ variantId, size = 16, className = "" }) {
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !isSignedIn });
  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  const items = wishlist?.items || [];
  const isSaved = isSignedIn && items.some((item) => item.product_variant_id === variantId);
  const isBusy = isAdding || isRemoving;

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    if (!variantId || isBusy) return;

    try {
      if (isSaved) {
        await removeFromWishlist(variantId).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(variantId).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(extractErrorMessage(err, "Couldn't update your wishlist"));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy}
        aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isSaved}
        className={
          className ||
          "h-8 w-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors disabled:opacity-60"
        }
      >
        <Heart size={size} className={isSaved ? "fill-rose-500 text-rose-500" : "text-gray-500"} />
      </button>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
