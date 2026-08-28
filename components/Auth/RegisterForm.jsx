"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleQuestion } from "@/redux/API_Slices/AuthSlice";

export default function RegisterForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Fake register
    setTimeout(() => {
      setLoading(false);
      // In a real app, call API, handle errors, store tokens, etc.
      try {
        localStorage.setItem("sb_user", JSON.stringify({ name, email }));
      } catch (err) {}
      dispatch(handleQuestion(true));
      if (onSuccess) onSuccess();
    }, 900);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-200 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-200 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-200 rounded p-2"
        />
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
