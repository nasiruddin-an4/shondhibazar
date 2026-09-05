// components/sections/TrustSections.js
"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { MapPin, Package, RefreshCw, CreditCard } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const certifications = [
  {
    id: 1,
    src: "/certificate/bsti.webp",
    alt: "BSTI Certification",
  },
  {
    id: 2,
    src: "/certificate/bcsir-1.webp",
    alt: "Quality Certification",
  },
  {
    id: 3,
    src: "/certificate/bari-logo.webp",
    alt: "Standards Certification",
  },
  {
    id: 4,
    src: "/certificate/HACCP-Certification-Logo-for-News-webpage-300x220-1-ra8egyrdzf1zzbvmx0ss0r7sr78bu1514nnq8urksg.jpg",
    alt: "HACCP Certification",
  },
  {
    id: 5,
    src: "/certificate/halal-certification1.png",
    alt: "Halal Certification",
  },
];

const brands = [
  {
    id: 1,
    src: "/trustBrand/dhaka-uttar-q9ia3vvxol25mpbgvl2vjpk1mm86r9nz04j8xgg7wg.webp",
    alt: "Dhaka Uttar",
  },
  {
    id: 2,
    src: "/trustBrand/oikko-q9ia3r6qqevq0nian11qp8qqnovcos5bbh9tj2n6rk.webp",
    alt: "Oikko",
  },
  {
    id: 3,
    src: "/trustBrand/meghna-q9ia3q8wjkufp1jnsin44qza2azzh31kzcmc1sokxs.webp",
    alt: "Meghna",
  },
  {
    id: 4,
    src: "/trustBrand/joita-q9ia3s4kx8x0c9gxhjgd9qi792qpwh91nlxb0clslc.webp",
    alt: "Joita",
  },
  {
    id: 5,
    src: "/trustBrand/ebl-q9ia3t2f42yanvfkc1uzu89nugm346crzqkshmkef4.webp",
    alt: "EBL",
  },
  {
    id: 6,
    src: "/trustBrand/SME-q9ia3uy3hr0vb3cu12o8z7sl18ctjkk8nzvrg6hm2o.webp",
    alt: "SME",
  },
];

const marketplaces = [
  {
    id: 1,
    src: "/Marketplaces/ekshop-logo-1.webp",
    alt: "Ekshop",
  },
  {
    id: 2,
    src: "/Marketplaces/food-panda-1.webp",
    alt: "Foodpanda",
  },
  {
    id: 3,
    src: "/Marketplaces/anadamela.webp",
    alt: "Anandamela",
  },
  {
    id: 4,
    src: "/Marketplaces/foodfornation.gov_.bd_.webp",
    alt: "Food for Nation",
  },
  {
    id: 5,
    src: "/Marketplaces/oikko-1.webp",
    alt: "Oikko",
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
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
          <div className="max-w-6xl mx-auto relative">
            {/* Gradient masks for smooth fade effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <Slider {...sliderSettings}>
              {[...brands, ...brands].map((brand, index) => (
                <div key={`brand-${brand.id}-${index}`} className="px-2">
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
          <div className="max-w-6xl mx-auto relative">
            {/* Gradient masks for smooth fade effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <Slider {...sliderSettings}>
              {[...marketplaces, ...marketplaces].map((market, index) => (
                <div key={`market-${market.id}-${index}`} className="px-2">
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
