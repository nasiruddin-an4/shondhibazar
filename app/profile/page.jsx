"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/Checkout/Loader";
import { User, Mail, Phone, MapPin, Save, X, ShieldCheck, Loader2, Edit2, Lock, Plus, BadgeCheck, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AuthModal from "@/components/Auth/AuthModal";
import OTPStep from "@/components/Auth/OTPStep";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useSendOtpMutation,
} from "@/redux/API_Query/ecommerceApi";

function PhoneVerifyModal({ phone, initialDevOtp, onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
          <OTPStep phone={phone} initialDevOtp={initialDevOtp} onVerified={onClose} />
        </div>
      </div>
    </>
  );
}

function AddressBook() {
  const { data: addressesRes, isLoading } = useGetAddressesQuery();
  const [addAddress, { isLoading: isSaving }] = useAddAddressMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "Home",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    is_default: false,
  });

  const addresses = addressesRes?.data || [];

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addAddress(form).unwrap();
      toast.success("Address saved");
      setShowForm(false);
      setForm({ label: "Home", full_name: "", phone: "", address: "", city: "", postal_code: "", is_default: false });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save address"));
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-500" />
          Saved Addresses
        </h3>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-full hover:bg-emerald-100 transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-gray-50 rounded-2xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            placeholder="Label (e.g. Home, Office)"
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <input
            required
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <input
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <textarea
            required
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2"
            rows={2}
          />
          <input
            placeholder="Postal code"
            value={form.postal_code}
            onChange={(e) => setForm((f) => ({ ...f, postal_code: e.target.value }))}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) => setForm((f) => ({ ...f, is_default: e.target.checked }))}
            />
            Set as default address
          </label>
          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 rounded-full text-gray-600 font-semibold text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold text-sm disabled:opacity-60">
              {isSaving ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-emerald-500" /></div>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved addresses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-gray-900">{addr.label}</span>
                {addr.is_default && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Default</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{addr.full_name} · {addr.phone}</p>
              <p className="text-sm text-gray-500 mt-1">{addr.address}{addr.city ? `, ${addr.city}` : ""}{addr.postal_code ? ` ${addr.postal_code}` : ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const isSignedIn = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: user, isLoading: isLoadingProfile } = useGetUserProfileQuery(undefined, { skip: !isSignedIn });
  const [updateProfile, { isLoading: saving }] = useUpdateUserProfileMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingDevOtp, setPendingDevOtp] = useState(null);

  const handleVerifyPhoneClick = async () => {
    try {
      const res = await sendOtp().unwrap();
      setPendingDevOtp(res.dev_otp || null);
      setShowOtpModal(true);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to send verification code"));
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isSignedIn) {
      setShowAuthModal(true);
    }
  }, [isSignedIn]);

  const save = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name, phone }).unwrap();
      toast.success("Profile updated");
      setIsEditing(false);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to update profile"));
    }
  };

  const cancelEdit = () => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setIsEditing(false);
  };

  if (isSignedIn && isLoadingProfile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-12 h-12 text-emerald-600" />
      </div>
    );

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Lock className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-8 max-w-md text-center">
          You must be logged in to view and edit your profile information.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1"
        >
          Login to Continue
        </button>
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const inputClass = isEditing
    ? "w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
    : "w-full bg-white border-transparent p-4 rounded-2xl text-gray-900 font-semibold shadow-sm outline-none cursor-default";

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 lg:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center p-4 bg-emerald-100 rounded-full mb-4 text-emerald-600">
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Account Settings
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600">
            Manage your personal information and preferences.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-gray-100 overflow-hidden"
        >
          <form onSubmit={save} className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 pb-12 border-b border-gray-100">
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-lg">
                <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-300" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{name || "Your Name"}</h3>
                <p className="text-gray-500 font-medium">{user?.email}</p>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="hidden sm:flex px-6 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-full hover:bg-emerald-100 transition-all items-center gap-2 shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-500" />
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  readOnly={!isEditing}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  Email Address
                </label>
                <input
                  value={user?.email || ""}
                  readOnly
                  disabled
                  className="w-full bg-gray-100 border-transparent p-4 rounded-2xl text-gray-500 font-semibold outline-none cursor-not-allowed"
                />
                <p className="text-xs text-gray-400">Email address cannot be changed.</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    Phone Number
                  </label>
                  {user?.phone && !isEditing && (
                    user.phone_verified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleVerifyPhoneClick}
                        disabled={isSendingOtp}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        {isSendingOtp ? "Sending..." : "Not verified · Verify now"}
                      </button>
                    )
                  )}
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +880 1234 567 890"
                  readOnly={!isEditing}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </button>
              )}
            </div>
          </form>

          <div className="px-8 md:px-12 pb-8 md:pb-12">
            <AddressBook />
          </div>
        </motion.div>
      </div>

      {showOtpModal && (
        <PhoneVerifyModal
          phone={user?.phone}
          initialDevOtp={pendingDevOtp}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
}
