"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { handleQuestion } from "@/redux/API_Slices/AuthSlice";

export default function ShortUserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sb_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {}
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("sb_user");
    } catch (err) {}
    dispatch(handleQuestion(false));
  };

  const initials = (user?.name || "U").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        title={user?.name || "User"}
        className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-medium hover:opacity-90 transition"
      >
        {user?.avatar ? (
          // show avatar image if provided
          <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-4 z-40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold">
              {initials}
            </div>
            <div>
              <div className="font-semibold">{user?.name || "User"}</div>
              <div className="text-sm text-gray-500">{user?.email || "-"}</div>
            </div>
          </div>

          <div className="border-t pt-2">
            <Link href="/profile" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">My profile</Link>
            <Link href="/orders" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">Orders</Link>
            <button onClick={logout} className="w-full text-left mt-2 px-2 py-2 text-sm text-red-600">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
