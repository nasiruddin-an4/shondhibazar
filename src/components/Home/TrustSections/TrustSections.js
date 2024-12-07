// components/sections/TrustSections.js
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Package, RefreshCw, CreditCard } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const certifications = [
  {
    id: 1,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/bsti.webp",
    alt: "BSTI Certification",
  },
  {
    id: 2,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/bcsir-1.webp",
    alt: "Quality Certification",
  },
  {
    id: 3,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/bari-logo.webp",
    alt: "Standards Certification",
  },
];

const brands = [
  {
    id: 1,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/dhaka-uttar.webp",
    alt: "Brand 1",
  },
  {
    id: 2,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/oikko.webp",
    alt: "Brand 2",
  },
  {
    id: 3,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/meghna.webp",
    alt: "Brand 3",
  },
  {
    id: 4,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/oikko.webp",
    alt: "Brand 4",
  },
  {
    id: 5,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/Dhaka-Dakkhin.webp",
    alt: "Brand 5",
  },
  {
    id: 6,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/joita.webp",
    alt: "Brand 6",
  },
];

const marketplaces = [
  {
    id: 1,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/wesell-online-1.webp",
    alt: "Sellonline.org",
  },
  {
    id: 2,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/food-panda-1.webp",
    alt: "Foodpanda",
  },
  {
    id: 3,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/anadamela.webp",
    alt: "Marketplace 3",
  },
  {
    id: 4,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/foodfornation.gov_.bd_.webp",
    alt: "Marketplace 4",
  },
  {
    id: 5,
    src: "https://shondhibazar.com/wp-content/uploads/2023/07/oikko-1.webp",
    alt: "Marketplace 5",
  },
];

const TrustSections = () => {
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
  const additionalStyles = `
  .slick-slider {
    position: relative;
    padding: 0 25px;
  }

  .slick-arrow {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .slick-slider:hover .slick-arrow {
    opacity: 1;
  }

  .slick-arrow.slick-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    .slick-arrow {
      display: none !important;
    }
  }`;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      {/* Certifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-6 text-[#374151]"
          >
            Certifications and Recommendations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          >
            We pick the very best so you can be assured of the quality. There
            can be no compromises when it comes to materials, ease of wear, and
            durability.
          </motion.p>
          <div className="flex justify-center items-center gap-16">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-32 h-32 relative"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto" />

      {/* Brands Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-[#374151]"
          >
            Brand That Trust Us
          </motion.h2>
          <div className="max-w-6xl mx-auto">
            <Slider {...sliderSettings}>
              {brands.map((brand) => (
                <div key={brand.id} className="px-4">
                  <div className="h-24 relative">
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto" />

      {/* Marketplaces Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 text-[#374151]"
          >
            Our Marketplaces
          </motion.h2>
          <div className="max-w-6xl mx-auto">
            <Slider {...sliderSettings}>
              {marketplaces.map((market) => (
                <div key={market.id} className="px-4">
                  <div className="h-24 relative">
                    <Image
                      src={market.src}
                      alt={market.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <hr className="border-gray-200 max-w-7xl mx-auto" />

      {/* Shipping Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <Package className="w-8 h-8 mb-4 text-gray-600" />
              <h3 className="font-medium mb-2">Flat shipping rate</h3>
              <p className="text-gray-600 text-sm">All over Dhaka BDT 80</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <RefreshCw className="w-8 h-8 mb-4 text-gray-600" />
              <h3 className="font-medium mb-2">Easy 3 days returns</h3>
              <p className="text-gray-600 text-sm">
                3 days money back guarantee
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <MapPin className="w-8 h-8 mb-4 text-gray-600" />
              <h3 className="font-medium mb-2">Pickup From Store</h3>
              <p className="text-gray-600 text-sm">
                Plot 2/A, Road - 8, Block - C1, Sector - 15, Uttara, Dhaka
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <CreditCard className="w-8 h-8 mb-4 text-gray-600" />
              <h3 className="font-medium mb-2">100% Secure Checkout</h3>
              <p className="text-gray-600 text-sm">MasterCard / Visa</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustSections;
