"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ open, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h2>
                <p className="text-sm text-gray-500">
                  {mode === "login"
                    ? "Enter your details to access your account"
                    : "Join us today for safe, farm-to-table groceries"}
                </p>
              </div>

              {mode === "login" ? (
                <LoginForm onSuccess={onClose} />
              ) : (
                <RegisterForm onSuccess={onClose} />
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("register")}
                      className="text-green-600 font-semibold hover:text-green-700 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => setMode("login")}
                      className="text-green-600 font-semibold hover:text-green-700 hover:underline"
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
