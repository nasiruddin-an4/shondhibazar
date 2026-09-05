"use client";
import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useSendCheckoutOtpMutation, useVerifyCheckoutOtpMutation } from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

// Verifies the phone number entered at checkout before the customer can proceed to payment.
// Unlike OTPStep (account verification), this is unauthenticated — most checkouts are guests.
export default function CheckoutPhoneOTP({ phone, initialDevOtp, onVerified, onBack }) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [devOtp, setDevOtp] = useState(initialDevOtp || null);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const inputsRef = useRef([]);
  const lastAttemptRef = useRef("");

  const [sendOtp, { isLoading: isSending }] = useSendCheckoutOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyCheckoutOtpMutation();

  const code = digits.join("");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Mirrors the backend's 60s resend cooldown so the button doesn't invite a 429.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-submit as soon as all 6 digits are filled (typed or pasted).
  useEffect(() => {
    if (code.length === OTP_LENGTH && code !== lastAttemptRef.current && !isVerifying) {
      handleVerify(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleVerify = async (otpCode) => {
    lastAttemptRef.current = otpCode;
    setError(null);
    try {
      await verifyOtp({ phone, otp: otpCode }).unwrap();
      onVerified?.();
    } catch (err) {
      setError(extractErrorMessage(err, "Incorrect OTP"));
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const resend = async () => {
    setError(null);
    try {
      const res = await sendOtp({ phone }).unwrap();
      setDevOtp(res.dev_otp || null);
      setDigits(Array(OTP_LENGTH).fill(""));
      lastAttemptRef.current = "";
      setCooldown(RESEND_COOLDOWN_SECONDS);
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to resend OTP"));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (code.length === OTP_LENGTH) handleVerify(code);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-800 transition-colors text-sm"
      >
        <ArrowLeft size={16} className="mr-2" />
        Edit shipping info
      </button>

      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20 rotate-3">
          <ShieldCheck className="w-8 h-8 -rotate-3" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify your phone number</h2>
        <p className="text-sm text-gray-500 mt-2">Enter the 6-digit code we sent to</p>
        <span className="inline-block mt-2 bg-gray-100 text-gray-800 font-semibold tracking-wide rounded-full px-3 py-1 text-sm">
          {phone}
        </span>
      </div>

      {devOtp && (
        <div className="bg-blue-50 border border-dashed border-blue-200 text-blue-700 text-sm rounded-xl px-4 py-2.5 text-center">
          Dev mode — your code is <span className="font-bold tracking-widest">{devOtp}</span>
        </div>
      )}

      {error && (
        <div key={error} className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5 animate-shake">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-11 h-12 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all
              ${error ? "border-red-300" : "border-gray-200"}
              focus:border-green-500 focus:ring-4 focus:ring-green-500/10`}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isVerifying || code.length !== OTP_LENGTH}
        className="w-full py-3.5 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isVerifying ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify & Continue"
        )}
      </button>

      <div className="text-center text-sm text-gray-500">
        {cooldown > 0 ? (
          <span>
            Resend code in <span className="font-medium text-gray-700">{cooldown}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={resend}
            disabled={isSending}
            className="text-green-600 hover:underline font-medium disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Resend code"}
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s;
        }
      `}</style>
    </form>
  );
}
