"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useGetOrderByIdQuery, useCreateReturnMutation } from "@/redux/API_Query/ecommerceApi";

const REASONS = [
  "Defective or Damaged",
  "Wrong Item Received",
  "Changed My Mind",
  "Item Missing from Order",
  "Quality Not As Expected",
  "Other"
];

export default function RequestReturnPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const { data: order, isLoading } = useGetOrderByIdQuery(id);
  const [createReturn, { isLoading: isSubmitting }] = useCreateReturnMutation();
  
  const [selectedItems, setSelectedItems] = useState({});
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState("");
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B5CF6]" />
      </div>
    );
  }
  
  if (!order) {
    return <div className="p-8 text-center text-red-500">Order not found.</div>;
  }
  
  // Basic eligibility check
  if (!['DELIVERED', 'SHIPPED'].includes(order.status)) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-800">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-400" />
        <h3 className="text-lg font-semibold mb-2">Order not eligible for return</h3>
        <p>You can only return items from orders that have been shipped or delivered.</p>
        <button 
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-white rounded-lg shadow-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleQtyChange = (itemId, qty, maxQty) => {
    if (qty <= 0) {
      const newItems = { ...selectedItems };
      delete newItems[itemId];
      setSelectedItems(newItems);
      return;
    }
    if (qty > maxQty) qty = maxQty;
    setSelectedItems({ ...selectedItems, [itemId]: qty });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const itemsPayload = Object.entries(selectedItems).map(([itemId, quantity]) => ({
      order_item_id: itemId,
      quantity
    }));
    
    if (itemsPayload.length === 0) {
      toast.error("Please select at least one item to return.");
      return;
    }
    
    try {
      await createReturn({
        order_id: id,
        reason,
        customer_notes: notes,
        items: itemsPayload
      }).unwrap();
      
      toast.success("Return request submitted successfully!");
      router.push("/returns");
      } catch (err) {
      toast.error(err?.data?.detail || "Failed to submit return request.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Request Return</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Items to Return</h3>
          
          <div className="space-y-4">
            {order.items.map((item) => {
              const selectedQty = selectedItems[item.id] || 0;
              const isSelected = selectedQty > 0;
              
              return (
                <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${isSelected ? 'border-[#8B5CF6] bg-purple-50/30' : 'border-gray-200 bg-gray-50'}`}>
                  <div>
                    <h4 className="font-medium text-gray-900">Item: <span className="font-mono text-sm text-gray-500">{item.id.split('-')[0]}</span></h4>
                    <p className="text-sm text-gray-500">Purchased Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">৳ {item.unit_price}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Return Qty:</label>
                    <input 
                      type="number"
                      min="0"
                      max={item.quantity}
                      value={selectedQty}
                      onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value) || 0, item.quantity)}
                      className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-6 space-y-5 bg-gray-50/50">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Return</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg bg-white"
            >
              {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please provide any extra details about the issue..."
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(selectedItems).length === 0}
            className="px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg font-medium hover:bg-[#7C3AED] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
