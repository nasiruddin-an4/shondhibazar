// components/layout/DesktopFooter.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const DesktopFooter = () => {
  const footerSections = {
    about: [
      { title: "Company", href: "/about" },
      { title: "Orders", href: "/orders" },
      { title: "Quality", href: "/about/safe-food" },
      { title: "Privacy Policy", href: "/refund-policy" },
      { title: "Gift Cards", href: "/product-category" },
    ],
    help: [
      { title: "My Account", href: "/profile" },
      { title: "Customer Help", href: "/about/faq" },
      { title: "Contact Us", href: "/about/contact-us" },
      { title: "Terms and Conditions", href: "/buying-guide" },
      { title: "FAQ", href: "/about/faq" },
    ],
    follow: [
      { title: "Facebook", href: "#" },
      { title: "LinkedIn", href: "#" },
    ],
  };

  const reviews = {
    images: [
      "/images/review/review1.png",
      "/images/review/review2.png",
      "/images/review/review3.png",
      "/images/review/review4.png",
      "/images/review/review5.png",
      "/images/review/review6.png",
    ],
    text: "Safe food Grocery. Freshness from farm to table. Very lucrative packaging. Safe food in eco friendly packaging. Fast delivery. Sincere effort is visible and appreciable.",
  };

  const LinkWithHover = ({ href, children }) => (
    <motion.div
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={href}
        className="block py-2 text-gray-400 hover:text-white transition-colors relative group"
      >
        <span className="absolute left-0 -ml-5 opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
        {children}
      </Link>
    </motion.div>
  );

  return (
    <div className="hidden lg:block bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">ABOUT</h3>
            {footerSections.about.map((link, index) => (
              <LinkWithHover key={index} href={link.href}>
                {link.title}
              </LinkWithHover>
            ))}
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">HELP</h3>
            {footerSections.help.map((link, index) => (
              <LinkWithHover key={index} href={link.href}>
                {link.title}
              </LinkWithHover>
            ))}
          </div>

          {/* Follow Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">FOLLOW</h3>
            {footerSections.follow.map((link, index) => (
              <LinkWithHover key={index} href={link.href}>
                {link.title}
              </LinkWithHover>
            ))}
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              OVER 100 5-STAR REVIEWS
            </h3>
            <div className="flex -space-x-2 mb-4">
              {reviews.images.map((image, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-black overflow-hidden"
                >
                  <Image
                    src={image} // Placeholder for demo
                    alt={`Reviewer ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm">{reviews.text}</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            © Shondhibazar {new Date().getFullYear()}
          </p>
          <div className="flex items-center space-x-2">
            <Image
              src="/images/ebl-skypay.webp"
              alt="Payment Methods"
              width={200}
              height={30}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
