"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/Checkout/Loader";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sb_user");
      const u = raw ? JSON.parse(raw) : null;
      setTimeout(() => {
        setUser(u);
        setName(u?.name || "");
        setAvatar(u?.avatar || "");
        setEmail(u?.email || "");
        setPhone(u?.phone || "");
        setAddress(u?.address || "");
        setLoading(false);
      }, 300);
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      const next = {
        ...(user || {}),
        name: name || user?.name || "User",
        avatar,
        email,
        phone,
        address,
      };
      try {
        localStorage.setItem("sb_user", JSON.stringify(next));
        window.dispatchEvent(new Event("sb_user_updated"));
      } catch (err) {}
      setUser(next);
      setSaving(false);
    }, 600);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-green-600" />
      </div>
    );

  return (
    <div className="min-h-screen px-4 pt-28 pb-24 lg:px-8 lg:py-10 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">My profile</h1>
        <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex items-center gap-4">
            <div>
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                {avatar ? (
                  <img src={avatar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/")}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
