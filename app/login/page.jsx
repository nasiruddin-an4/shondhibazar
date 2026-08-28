"use client";
import { useState } from "react";
import AuthModal from "@/components/Auth/AuthModal";

export default function LoginPage() {
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthModal open={open} onClose={() => setOpen(false)} />
      {!open && (
        <div className="text-center">
          <p className="text-lg">
            You closed the dialog. Go back to{" "}
            <a href="/" className="text-green-600">
              home
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
