// components/sections/CommunityFarmers.js
"use client";
import { motion } from "motion/react";
import Image from "next/image";

const CommunityFarmers = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Shondhi Community Farmers
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          With an aim to practice and conform to World Health Organization's
          (WHO) Good Agricultural Practices (GAP) standard and in due course
          become fully "ORGANIC", we are focusing on doing contract farming so
          that we can collect our products in its purest forms.
        </p>
      </div>

      <div className="grid gap-16">
        {/* First Content Block */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="prose prose-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Minara Begum
              </h2>
              <p className="text-gray-600">
                Minara Begum is one among many like her, who have changed their
                fortunes by becoming members of our Shondhi Farmers' Community.
                We encourage women in contract dairy farming. We provide them
                with cows and impart training on proper rearing. The members
                give back through bartering of pure milk. Thus, we bring you
                delicacies made from pure milk. We have empowered the lives of
                many such women and households in the country and that is too by
                protecting our nature from being polluted by all chemical
                pesticides.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="bg-[#FDF6F0] flex justify-center pb-4 rounded-lg">
              <img
                src="/images/img.webp"
                alt="Community farmer with produce"
                className="w-[70%] h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Second Content Block */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-[#FDF6F0] flex justify-center pb-4 rounded-lg">
            <img
              src="/images/img2.webp"
              alt="Farmers reviewing documents"
              className="w-[40%] h-[350px] rounded-lg object-cover"
            />
          </div>
          <div>
            <div className="prose prose-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Agreement with Shondhi Growers
              </h2>
              <p className="text-gray-600">
                As we have access to information from BARI (Bangladesh
                Agriculture Research Institute) regarding the source of a
                particular product produced from the best variety of seeds and
                rich in nutrition, we reach out to those farmers who have the
                potential but lack in resources. We facilitate them with all
                necessary support including funds and take pride calling
                ourselves as their partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityFarmers;
