// components/hero/HeroSection.js
"use client";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/Nwl9p-2TrbM?controls=0&rel=0&playsinline=1&enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Nwl9p-2TrbM&modestbranding=1&showinfo=0&vq=hd1080"
            title="Farm Fresh Products"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "177.77777778vh", // 16:9 aspect ratio
              height: "56.25vw", // 16:9 aspect ratio
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              transform: "translate(-50%, -50%) scale(1.5)", // Increased scale for better coverage
              transformOrigin: "center center",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center text-white w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6"
          >
            From your Growers
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-6 md:mb-8 px-2"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-medium mb-1 sm:mb-2">
              Your Trusted Online Platform for
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">
              Safe and Farm-to-Table Grocery
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white 
                px-6 sm:px-6 md:px-8 
                py-3 sm:py-3 md:py-4 
                rounded-lg 
                text-base sm:text-base md:text-xl lg:text-2xl 
                font-medium 
                inline-flex items-center 
                transition-colors"
            >
              Browse Safe Food
              <span className="ml-2 text-xl">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
