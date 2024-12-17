"use client";
import React, { useState } from "react";
import { validateEmail, validatePhone } from "@/lib/checkoutUtils";

import { ChevronRight } from "lucide-react";

// Loader Component for the submit button
const Loader = ({ className = "" }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Skeleton Loader Component
const ShippingFormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    {/* Title Skeleton */}
    <div className="h-7 bg-gray-200 rounded w-48"></div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Full Name Field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-20 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Phone Number Field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-28 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Email Field */}
      <div className="md:col-span-2">
        <div className="h-5 bg-gray-200 rounded w-28 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Address Field */}
      <div className="md:col-span-2">
        <div className="h-5 bg-gray-200 rounded w-20 mb-1"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
      </div>

      {/* City Field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>

      {/* Postal Code Field */}
      <div>
        <div className="h-5 bg-gray-200 rounded w-24 mb-1"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>

    {/* Button Skeleton */}
    <div className="h-12 bg-gray-200 rounded w-full"></div>
  </div>
);

const ShippingForm = ({ onSubmit, initialData, isLoading }) => {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = "Valid phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            disabled={isLoading}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.address ? "border-red-500" : "border-gray-300"}`}
            disabled={isLoading}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${errors.city ? "border-red-500" : "border-gray-300"}`}
            disabled={isLoading}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-medium 
                 hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Continue to Payment
            <ChevronRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default ShippingForm;
