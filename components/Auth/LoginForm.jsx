"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/API_Slices/AuthSlice";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import {
  useLoginMutation,
  useLazyGetUserProfileQuery,
} from "@/redux/API_Query/ecommerceApi";

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [fetchProfile] = useLazyGetUserProfileQuery();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const tokens = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          token: tokens.access_token,
          refreshToken: tokens.refresh_token,
        })
      );
      const user = await fetchProfile().unwrap();
      dispatch(setCredentials({ token: tokens.access_token, user }));
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(extractErrorMessage(err, "Invalid email or password."));
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2.5">
          {error}
        </div>
      )}

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
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a href="/forgot" className="text-xs text-green-600 hover:text-green-700 hover:underline font-medium">
            Forgot password?
          </a>
        </div>
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
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
