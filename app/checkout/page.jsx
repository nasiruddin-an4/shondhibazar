import Checkout from "@/components/Checkout/Checkout";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Checkout />
      </Suspense>
    </div>
  );
};

export default page;
