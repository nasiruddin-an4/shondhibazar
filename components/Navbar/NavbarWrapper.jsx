"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import TopNavbar from "./TopNavbar";
import MainNavbar from "./MainNavbar";
import MobileNav from "./MobileNav";
import CartDrawer from "./CartDrawer";
import MobileMenuDrawer from "./MobileMenuDrawer";
const NavbarWrapper = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <TopNavbar />
          <MainNavbar onOpenCart={() => setIsCartOpen(true)} />
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default NavbarWrapper;
