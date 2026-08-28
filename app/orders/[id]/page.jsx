"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Checkout/Loader";

export default function OrderDetails({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [order, setOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      setOrder(null);
      setTimeout(() => {
        const raw = localStorage.getItem("sb_orders");
        const list = raw ? JSON.parse(raw) : [];
        const o = list.find((x) => x.id === id);
        setOrder(o || null);
      }, 400);
    } catch (err) {
      setOrder(null);
    }
  }, [id]);

  if (order === null)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-green-600" />
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
          <button
            onClick={() => router.push("/orders")}
            className="text-green-600"
          >
            Back to orders
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Order</div>
              <div className="text-lg font-semibold">{order.id}</div>
              <div className="text-xs text-gray-400">
                Placed: {new Date(order.date).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-semibold">৳{order.total}</div>
              <div className="mt-1 text-sm">
                Status: <span className="font-medium">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">Tracking</h3>
            <div className="relative pl-6">
              {/* vertical line */}
              <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />

              <div className="mb-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                  1
                </div>
                <div className="ml-6">
                  <div className="font-medium">Order placed</div>
                  <div className="text-sm text-gray-500">
                    We received your order.
                  </div>
                </div>
              </div>

              <div className="mb-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs">
                  2
                </div>
                <div className="ml-6">
                  <div className="font-medium">Packed</div>
                  <div className="text-sm text-gray-500">
                    Your items have been packed.
                  </div>
                </div>
              </div>

              <div className="mb-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                  3
                </div>
                <div className="ml-6">
                  <div className="font-medium">Out for delivery</div>
                  <div className="text-sm text-gray-500">
                    Courier is on the way.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
