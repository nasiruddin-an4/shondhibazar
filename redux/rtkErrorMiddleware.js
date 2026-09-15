import toast from "react-hot-toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * RTK Query error middleware — intercepts rejected API actions and shows
 * user-friendly toast notifications for common HTTP errors.
 *
 * Handles:
 * - 429 Too Many Requests: rate-limit toast with Retry-After info
 * - 500+ Server Errors: generic "Something went wrong" toast
 * - 403 Forbidden: access denied toast
 * - Network errors: connection failure toast
 */
export const rtkErrorMiddleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { status, data } = action.payload || {};

    // Skip 401 — handled by the re-auth logic in APIQuery.js
    if (status === 401) return next(action);

    if (status === 429) {
      // Extract Retry-After if available (seconds or HTTP-date)
      const retryAfter = action.meta?.baseQueryMeta?.response?.headers?.get?.("Retry-After");
      const seconds = retryAfter ? parseInt(retryAfter, 10) : null;

      const message = data?.detail || "Too many requests. Please slow down.";
      const suffix = seconds && !isNaN(seconds) ? ` Try again in ${seconds}s.` : "";

      toast.error(`${message}${suffix}`, {
        id: "rate-limit", // de-duplicate concurrent 429 toasts
        duration: seconds ? seconds * 1000 : 5000,
        icon: "⏳",
      });
    } else if (status === 403) {
      toast.error(data?.detail || "You don't have permission to do that.", {
        id: "forbidden",
        duration: 4000,
      });
    } else if (status >= 500) {
      toast.error("Something went wrong on our end. Please try again later.", {
        id: "server-error",
        duration: 5000,
      });
    } else if (status === "FETCH_ERROR") {
      toast.error("Connection failed. Please check your internet and try again.", {
        id: "network-error",
        duration: 5000,
      });
    }
  }

  return next(action);
};
