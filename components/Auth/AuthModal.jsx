"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState("login");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {mode === "login"
                  ? "Sign in to your account"
                  : "Create an account"}
              </h3>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    setMode(mode === "login" ? "register" : "login")
                  }
                  className="text-sm text-green-600 hover:underline"
                >
                  {mode === "login" ? "Register" : "Login"}
                </button>
                <button onClick={onClose} className="text-gray-500 text-sm">
                  Close
                </button>
              </div>
            </div>

            {mode === "login" ? (
              <LoginForm onSuccess={onClose} />
            ) : (
              <RegisterForm onSuccess={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
