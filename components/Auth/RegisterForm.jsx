"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/API_Slices/AuthSlice";
import {
  useRegisterMutation,
  useLazyGetUserProfileQuery,
  useSendOtpMutation,
} from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import OTPStep from "./OTPStep";

export default function RegisterForm({ onSuccess, onStepChange }) {
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [devOtp, setDevOtp] = useState(null);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [fetchProfile] = useLazyGetUserProfileQuery();
  const [sendOtp] = useSendOtpMutation();

  const goToStep = (s) => {
    setStep(s);
    onStepChange?.(s);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const tokens = await register({ name, email, phone, password }).unwrap();
      dispatch(
        setCredentials({
          token: tokens.access_token,
          refreshToken: tokens.refresh_token,
        })
      );
      const user = await fetchProfile().unwrap();
      dispatch(setCredentials({ token: tokens.access_token, user }));

      // Always show the OTP screen after successful registration.
      // If the initial OTP send fails, the user can retry via "Resend code".
      try {
        const otpRes = await sendOtp().unwrap();
        setDevOtp(otpRes.dev_otp || null);
      } catch (otpErr) {
        // OTP send failed (provider outage, rate limit, etc.) — not critical.
        // The OTP screen will still render and the user can hit "Resend code".
      }
      goToStep("otp");
    } catch (err) {
      setError(extractErrorMessage(err, "Could not create your account."));
    }
  };

  if (step === "otp") {
    return <OTPStep phone={phone} initialDevOtp={devOtp} onVerified={() => onSuccess?.()} />;
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. John Doe"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="e.g. 01712345678"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder:text-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors shadow-sm mt-2"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
