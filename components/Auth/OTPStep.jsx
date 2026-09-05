"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShieldCheck } from "lucide-react";
import { updateUser } from "@/redux/API_Slices/AuthSlice";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

// Shared phone-OTP entry step, used right after registration and from the Profile page
// when a user wants to (re-)verify their phone number.
export default function OTPStep({ phone, initialDevOtp, onVerified, onSkip }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState(initialDevOtp || null);
  const [error, setError] = useState(null);
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await verifyOtp({ otp }).unwrap();
      dispatch(updateUser(user));
      onVerified?.(user);
    } catch (err) {
      setError(extractErrorMessage(err, "Incorrect OTP"));
    }
  };

  const resend = async () => {
    setError(null);
    try {
      const res = await sendOtp().unwrap();
      setDevOtp(res.dev_otp || null);
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to resend OTP"));
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      <div className="text-center">
        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h3 className="font-semibold text-gray-900">Verify your phone number</h3>
        <p className="text-sm text-gray-500 mt-1">Enter the 6-digit code sent to {phone}</p>
      </div>

      {devOtp && (
        <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-lg px-4 py-2.5 text-center">
          Dev mode — your code is <span className="font-bold">{devOtp}</span>
        </div>
      )}

      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="123456"
        required
        className="w-full text-center text-2xl tracking-[0.5em] font-bold border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
      />

      <button
        type="submit"
        disabled={isVerifying || otp.length !== 6}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {isVerifying ? "Verifying..." : "Verify"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={resend}
          disabled={isSending}
          className="text-green-600 hover:underline font-medium disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Resend code"}
        </button>
        {onSkip && (
          <button type="button" onClick={onSkip} className="text-gray-400 hover:text-gray-600">
            Skip for now
          </button>
        )}
      </div>
    </form>
  );
}
