// src/utils/checkoutUtils.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateShipping = (subtotal) => {
  return subtotal >= 1000 ? 0 : 60;
};

export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Checks a coupon (as returned by GET /promotions/coupons) against the current
// subtotal — active window, usage limit, and minimum order amount — without
// computing a discount. Use calculateDiscount() once this passes.
export const validateCoupon = (coupon, subtotal) => {
  if (!coupon) return { valid: false, reason: "Coupon not found." };
  if (coupon.is_active === false) {
    return { valid: false, reason: "This coupon is no longer active." };
  }
  const now = new Date();
  if (coupon.start_date && now < new Date(coupon.start_date)) {
    return { valid: false, reason: "This coupon isn't active yet." };
  }
  if (coupon.end_date && now > new Date(coupon.end_date)) {
    return { valid: false, reason: "This coupon has expired." };
  }
  if (coupon.usage_limit != null && coupon.used_count >= coupon.usage_limit) {
    return { valid: false, reason: "This coupon has reached its usage limit." };
  }
  const minOrder = coupon.min_order_amount ? parseFloat(coupon.min_order_amount) : 0;
  if (subtotal < minOrder) {
    return { valid: false, reason: `Add ${minOrder.toFixed(2)}৳ more to use this coupon.` };
  }
  return { valid: true };
};

// PERCENTAGE coupons take a % of subtotal (capped at max_discount_amount, if
// set); FIXED_AMOUNT coupons knock off a flat amount. Never exceeds the
// subtotal itself.
export const calculateDiscount = (coupon, subtotal) => {
  if (!coupon) return 0;
  const value = parseFloat(coupon.value) || 0;
  let discount = coupon.discount_type === "PERCENTAGE" ? (subtotal * value) / 100 : value;
  const maxDiscount = coupon.max_discount_amount ? parseFloat(coupon.max_discount_amount) : null;
  if (maxDiscount != null) discount = Math.min(discount, maxDiscount);
  return Math.max(0, Math.min(discount, subtotal));
};
