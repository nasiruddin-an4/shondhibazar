"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useLazyApplyCouponQuery } from "@/redux/API_Query/ecommerceApi";
import { setCoupon, clearCoupon } from "@/redux/API_Slices/productSlice";
import { validateCoupon } from "@/lib/checkoutUtils";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import AuthModal from "@/components/Auth/AuthModal";

/**
 * The promo code input + "applied coupon" chip shared by the cart drawer and
 * the checkout order summary. Coupon state lives in Redux (state.products.coupon)
 * so applying it in one place is reflected everywhere else that reads it.
 */
export default function PromoCodeField({ subtotal }) {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const coupon = useSelector((state) => state.products.coupon);
  const [promoCode, setPromoCode] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [applyCouponTrigger, { isFetching: isApplying }] = useLazyApplyCouponQuery();

  const handleApply = async () => {
    const code = promoCode.trim();
    if (!code) return;

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await applyCouponTrigger(code).unwrap();
      const list = res?.data || [];
      const match = list.find((c) => c.code?.toLowerCase() === code.toLowerCase());

      if (!match) {
        toast.error("Invalid coupon code");
        return;
      }

      const { valid, reason } = validateCoupon(match, subtotal);
      if (!valid) {
        toast.error(reason);
        return;
      }

      dispatch(setCoupon(match));
      setPromoCode("");
      toast.success(`Coupon "${match.code}" applied!`);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Couldn't apply that coupon"));
    }
  };

  return (
    <>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {coupon ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-full px-4 py-2.5">
          <span className="text-sm font-semibold text-green-700 flex items-center gap-1.5">
            <Tag size={14} />
            {coupon.code} applied
          </span>
          <button
            onClick={() => dispatch(clearCoupon())}
            aria-label="Remove coupon"
            className="text-green-700 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter Promo Code"
            className="flex-1 min-w-0 rounded-full bg-gray-100 border border-transparent px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:bg-white transition-colors"
          />
          <button
            onClick={handleApply}
            disabled={isApplying || !promoCode.trim()}
            className="shrink-0 px-4 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            {isApplying ? <Loader2 size={14} className="animate-spin" /> : "Apply Code"}
          </button>
        </div>
      )}
    </>
  );
}
