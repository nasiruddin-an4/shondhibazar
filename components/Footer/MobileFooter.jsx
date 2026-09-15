// components/layout/MobileFooter.js
"use client";
import Link from "next/link";
import { LayoutGrid, Home, ShoppingCart, User } from "lucide-react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

const CartIcon = ({ count }) => (
  <div className="relative">
    <ShoppingCart size={20} />
    {count > 0 && (
      <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center px-1 min-w-[16px] h-4 text-[10px] font-bold leading-none text-white bg-green-600 rounded-full">
        {count}
      </span>
    )}
  </div>
);

const MobileFooter = () => {
  const cart = useSelector((state) => state.products.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const footerItems = [
    { icon: <Home size={20} />, label: "Home", href: "/" },
    { icon: <LayoutGrid size={20} />, label: "Products", href: "/product-category" },
    { icon: <CartIcon count={cartCount} />, label: "Cart", action: "cart" },
    { icon: <User size={20} />, label: "Account", href: "/profile" },
  ];

  const handleAction = (item) => {
    if (item.action === "cart") {
      window.dispatchEvent(new Event('open-cart'));
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top z-40 border-t">
      <div className="grid grid-cols-4 gap-1">
        {footerItems.map((item, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            className="text-center py-2"
          >
            {item.href ? (
              <Link href={item.href}>
                <div className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors">
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </div>
              </Link>
            ) : (
              <button 
                onClick={() => handleAction(item)}
                className="w-full flex flex-col items-center space-y-1 text-gray-600 hover:text-green-600 transition-colors bg-transparent border-none"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileFooter;
