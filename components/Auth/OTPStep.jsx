"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ShieldCheck, CheckCircle2, Loader2, RotateCw } from "lucide-react";
import { updateUser } from "@/redux/API_Slices/AuthSlice";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/API_Query/ecommerceApi";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export default function OTPStep({ phone, initialDevOtp, onVerified, onSkip }) {
  const dispatch = useDispatch();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [devOtp, setDevOtp] = useState(initialDevOtp || null);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const otp = digits.join("");

  const submitOtp = useCallback(async (code) => {
    if (code.length !== OTP_LENGTH) return;
    setError(null);
    try {
      const user = await verifyOtp({ otp: code }).unwrap();
      dispatch(updateUser(user));
      setVerified(true);
      setTimeout(() => onVerified?.(user), 1200);
    } catch (err) {
      setError(extractErrorMessage(err, "Incorrect OTP. Please try again."));
      // Shake & clear
      setDigits(Array(OTP_LENGTH).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [verifyOtp, dispatch, onVerified]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    setError(null);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Auto-submit when last digit entered
    const code = next.join("");
    if (code.length === OTP_LENGTH) {
      submitOtp(code);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
    if (pasted.length === OTP_LENGTH) {
      submitOtp(pasted);
    }
  };

  const resend = async () => {
    setError(null);
    try {
      const res = await sendOtp().unwrap();
      setDevOtp(res.dev_otp || null);
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(extractErrorMessage(err, "Failed to resend code. Please try again."));
    }
  };

  // Mask phone: show first 3 and last 2 digits
  const maskedPhone = phone
    ? phone.slice(0, 3) + "••••••" + phone.slice(-2)
    : "your phone";

  // Success state
  if (verified) {
    return (
      <div className="flex flex-col items-center py-6 space-y-4 animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce-in">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Phone Verified!</h3>
        <p className="text-sm text-gray-500">Redirecting you now...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with animated icon */}
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping-slow" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Verify your phone number</h3>
        <p className="text-sm text-gray-500 mt-1">
          We sent a 6-digit code to <span className="font-semibold text-gray-700">{maskedPhone}</span>
        </p>
      </div>

      {/* Dev OTP hint */}
      {devOtp && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-center">
          <span className="text-xs font-medium text-sky-600 uppercase tracking-wider">Dev Mode</span>
          <p className="text-lg font-bold text-sky-800 tracking-[0.3em] mt-0.5">{devOtp}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 text-center font-medium animate-shake">
          {error}
        </div>
      )}

      {/* OTP digit inputs */}
      <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={isVerifying}
            className={`
              w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none
              transition-all duration-200
              ${digit
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/10"
                : "border-gray-200 bg-gray-50 text-gray-900 hover:border-gray-300"
              }
              focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          />
        ))}
      </div>

      {/* Verify button */}
      <button
        type="button"
        onClick={() => submitOtp(otp)}
        disabled={isVerifying || otp.length !== OTP_LENGTH}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:shadow-none flex items-center justify-center gap-2"
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify & Continue"
        )}
      </button>

      {/* Resend / Skip footer */}
      <div className="flex items-center justify-center">
        {cooldown > 0 ? (
          <p className="text-sm text-gray-400">
            Resend code in <span className="font-semibold text-gray-600 tabular-nums">{cooldown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={resend}
            disabled={isSending}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSending ? "animate-spin" : ""}`} />
            {isSending ? "Sending..." : "Resend code"}
          </button>
        )}
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
