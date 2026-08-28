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
