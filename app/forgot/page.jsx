"use client";
import { useState } from "react";
import Loader from "@/components/Checkout/Loader";
import { useForgotPasswordMutation } from "@/redux/API_Query/ecommerceApi";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
    } catch (err) {
      // Backend intentionally returns the same generic response whether or not
      // the email exists, so we still show the "check your inbox" state on error.
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Forgot password</h1>
        {!sent ? (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded"
              >
                {loading ? (
                  <Loader className="w-5 h-5 text-white inline-block" />
                ) : (
                  "Send reset link"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">
              We sent a reset link if the email exists. Check your inbox.
            </p>
            <a href="/" className="text-green-600">
              Return home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
