"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { Section } from "lucide-react";

const Counter = ({ value, suffix = "", text }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="text-2xl md:text-5xl font-semibold text-gray-700 mb-2">
        <span ref={ref}>0{suffix}</span>
      </div>
      <div className="text-gray-700 text-base md:text-lg">{text}</div>
    </div>
  );
};

export default function OurImpact() {
  return (
    <div className="bg-gray-50">
      <div className="w-full max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 md:px-8 ">
        <h2 className="text-3xl md:text-4xl  font-bold text-center text-gray-700 mb-8 md:mb-10">
          Our Impact at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <Counter value={228} suffix="K+" text="Safe Meals Served" />
          <Counter value={600} suffix="+" text="Women Farmers" />
          <Counter value={250} suffix="K+" text="Eco-Friendly Packaging" />
          <Counter value={100} suffix="%" text="Compost-based Farming" />
        </div>
      </div>
    </div>


  );
}
