"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sb_orders");
      setOrders(raw ? JSON.parse(raw) : []);
    } catch (err) {
      setOrders([]);
    }
  }, []);

  if (!orders.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-500">
            You have no recent orders. Start shopping!
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">Order</div>
                  <div className="font-medium text-lg">{o.id}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(o.date).toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">৳{o.total}</div>
                  <div className="mt-2">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Estimated delivery: 2-4 days
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => (window.location.href = `/orders/${o.id}`)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                  >
                    Track
                  </button>
                  <a
                    href={`/invoice/${o.id}`}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Invoice
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
