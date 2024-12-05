// components/sections/SafeFoodEndeavor.js
"use client";
import { motion } from "framer-motion";
import { Store, FileText, ShoppingBag } from "lucide-react";

const features = [
  {
    icon: <Store className="w-12 h-12" />,
    title: "Our Safe Food",
    description:
      "Safe food, naturally preserved Crops produced from the best seeds selected by Bangladesh Rice Research (BARI) and Agricultural Research (BRRI).",
  },
  {
    icon: <FileText className="w-12 h-12" />,
    title: "Natural Preservation",
    description:
      "We are against misuse and overuse of Pesticides and only preserve our safe food using Natural Preservatives that are absolutely chemical free.",
  },
  {
    icon: <ShoppingBag className="w-12 h-12" />,
    title: "Biodegradable Packaging",
    description:
      "With a vow to keep our world breathable and healthy we have opted for eco friendly biodegradable packaging.",
  },
];

const SafeFoodEndeavor = () => {
  return (
    <section className="py-16 bg-[#f9f5f1]">
      <div className="container mx-auto px-4">
        {/* Title and Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            A Safe Food Endeavor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed"
          >
            We source our products directly from farmers and process them in a
            hygienic and scientific way, without using harmful chemicals or
            preservatives. We are committed to food safety at all stages of the
            food chain, and our products are inspected by the Bangladesh
            Standards and Testing Institution (BSTI) and the Bangladesh Council
            of Scientific and Industrial Research (BCSIR).
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center text-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafeFoodEndeavor;
