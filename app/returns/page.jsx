"use client";

import React from "react";
import Link from "next/link";
import { PackageX, ArrowRight, Loader2 } from "lucide-react";
import { useGetMyReturnsQuery } from "@/redux/API_Query/ecommerceApi";

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getStatusColor(status) {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'APPROVED': return 'bg-blue-100 text-blue-800';
    case 'INSPECTING': return 'bg-indigo-100 text-indigo-800';
    case 'RESTOCKED':
    case 'REFUNDED': return 'bg-green-100 text-green-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function MyReturnsPage() {
  const { data, isLoading } = useGetMyReturnsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
      </div>
    );
  }

  const returns = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">My Returns</h2>
      </div>

      {returns.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <PackageX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No returns found</h3>
          <p className="mt-2 text-gray-500 max-w-sm mx-auto">
            You haven't requested any returns yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">
                    RMA <span className="font-mono text-gray-900 font-medium">#{req.id.split('-')[0].toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Order <span className="font-mono font-medium">#{req.order_id.split('-')[0].toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-1">Reason</span>
                  <p className="text-gray-900 font-medium">{req.reason}</p>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Date Requested</span>
                  <p className="text-gray-900 font-medium">{formatDate(req.created_at)}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Items Returned:</h4>
                <div className="space-y-2">
                  {req.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-600 font-mono text-xs">Item {item.order_item_id.split('-')[0]}</span>
                      <span className="text-gray-900 font-medium">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
