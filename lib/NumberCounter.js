"use client";

import { useState, useEffect } from "react";

export const NumberCounter = ({ value = 0 }) => {
  const [mounted, setMounted] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof value !== "number") return;

    const steps = 20;
    const increment = (value - displayValue) / steps;
    let current = displayValue;

    const interval = setInterval(() => {
      if (Math.abs(current - value) > Math.abs(increment)) {
        current += increment;
        setDisplayValue(current);
      } else {
        setDisplayValue(value);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [value, mounted, displayValue]);

  const formatValue = (val) => {
    if (typeof val !== "number" || isNaN(val)) return "0.00";
    return val.toFixed(2);
  };

  // Server-side or initial render
  if (!mounted) {
    return formatValue(value);
  }

  return formatValue(displayValue);
};

// "use client";

// import { useState, useEffect } from "react";

// export const NumberCounter = ({ value }) => {
//   const [mounted, setMounted] = useState(false);
//   const [displayValue, setDisplayValue] = useState(value);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted) {
//       const steps = 20;
//       const increment = (value - displayValue) / steps;
//       let current = displayValue;

//       const interval = setInterval(() => {
//         if (Math.abs(current - value) > Math.abs(increment)) {
//           current += increment;
//           setDisplayValue(current);
//         } else {
//           setDisplayValue(value);
//           clearInterval(interval);
//         }
//       }, 20);

//       return () => clearInterval(interval);
//     }
//   }, [value, mounted]);

//   // Server-side or initial render
//   if (!mounted) {
//     return value.toFixed(2);
//   }

//   return displayValue.toFixed(2);
// };
