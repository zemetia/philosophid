"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  School, 
  BookOpen, 
  Sparkles, 
  Instagram, 
  Linkedin, 
  Phone, 
  Check, 
  Edit3, 
  Loader2,
  Save,
  X
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  score: number;
  bio: string;
  age: number;
  birthday: string;
  location: string;
  institution: string;
  major: string;
  interests: string;
  favoritePhilosopher: string;
  phone: string;
  instagram: string;
  facebook: string;
  linkedIn: string;
  preferredLanguage: string;
  philosophySchool: string;
  createdAt: string;
}

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user.uid);
      } else {
        setLoading(false);
        // Maybe redirect to login if no user?
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid: string) => {
    try {
      const response = await fetch("/api/user/profile", {
        headers: {
          "x-firebase-uid": uid,
        },
      });
      const result = await response.json();
      if (result.data) {
        setProfile(result.data.user);
        setFormData(result.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Unauthorized");

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-firebase-uid": user.uid,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
        setIsEditing(false);
        setMessage({ type: "success", text: "Profile updated with rational precision." });
      } else {
        setMessage({ type: "error", text: "The system encountered a logical fallacy. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Connection to the digital manifold failed." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#4E6E81] animate-spin mb-4" />
        <p className="font-space-grotesk text-[#4E6E81] animate-pulse">Syncing persona...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#E5E7EB] shadow-sm">
        <div className="h-32 bg-gradient-to-r from-[#4E6E81] to-[#2C3E50] opacity-10"></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-end gap-6 -mt-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-100">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F4F2ED]">
                  <User className="w-12 h-12 text-[#4E6E81]" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#4E6E81] text-white p-2 rounded-lg shadow-lg">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-literata font-bold text-[#1A1A1A]">{profile?.name}</h1>
                <p className="font-space-grotesk text-[#4E6E81] flex items-center gap-2">
                  <span className="uppercase tracking-widest text-xs font-bold">{profile?.role}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{profile?.score} Logical Points</span>
                </p>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-space-grotesk transition-all duration-300 active:scale-95 ${
                  isEditing 
                  ? "bg-[#F4F2ED] text-[#4E6E81] hover:bg-gray-200" 
                  : "bg-[#4E6E81] text-white hover:bg-[#3D5A6C] shadow-md shadow-[#4E6E81]/20"
                }`}
              >
                {isEditing ? (
                  <><X className="w-4 h-4" /> Cancel</>
                ) : (
                  <><Edit3 className="w-4 h-4" /> Edit Profile</>
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mx-8 mb-6 p-4 rounded-xl border flex items-center gap-3 font-space-grotesk text-sm ${
                message.type === "success" 
                ? "bg-green-50 border-green-100 text-green-700" 
                : "bg-red-50 border-red-100 text-red-700"
              }`}
            >
              {message.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Philosophical Identity */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            layout
            className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[#F4F2ED] pb-4">
              <BookOpen className="w-5 h-5 text-[#4E6E81]" />
              <h2 className="text-xl font-literata font-bold">Philosophical Persona</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">The Axiom (Bio)</label>
                {isEditing ? (
                  <textarea 
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Write your philosophical narrative..."
                    className="w-full bg-[#F4F2ED] border-none rounded-2xl p-4 font-space-grotesk min-h-[120px] focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                  />
                ) : (
                  <p className="font-space-grotesk text-[#374151] leading-relaxed italic">
                    {profile?.bio || "No narrative established yet. Define your digital existence."}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">Favorite Philosopher</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.favoritePhilosopher || ""}
                      onChange={(e) => setFormData({...formData, favoritePhilosopher: e.target.value})}
                      placeholder="e.g. Spinoza, Hegel, Camus"
                      className="w-full bg-[#F4F2ED] border-none rounded-xl p-3 font-space-grotesk focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                    />
                  ) : (
                    <p className="font-space-grotesk font-medium text-[#1A1A1A]">{profile?.favoritePhilosopher || "Undecided"}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">School of Thought</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.philosophySchool || ""}
                      onChange={(e) => setFormData({...formData, philosophySchool: e.target.value})}
                      placeholder="e.g. Stoicism, Existentialism"
                      className="w-full bg-[#F4F2ED] border-none rounded-xl p-3 font-space-grotesk focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                    />
                  ) : (
                    <p className="font-space-grotesk font-medium text-[#1A1A1A]">{profile?.philosophySchool || "Eclectic"}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            layout
            className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-[#F4F2ED] pb-4">
              <School className="w-5 h-5 text-[#4E6E81]" />
              <h2 className="text-xl font-literata font-bold">Academic Grounding</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">Institution</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.institution || ""}
                    onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    className="w-full bg-[#F4F2ED] border-none rounded-xl p-3 font-space-grotesk focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                  />
                ) : (
                  <p className="font-space-grotesk text-[#1A1A1A]">{profile?.institution || "Independent Researcher"}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">Field of Study</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.major || ""}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                    className="w-full bg-[#F4F2ED] border-none rounded-xl p-3 font-space-grotesk focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                  />
                ) : (
                  <p className="font-space-grotesk text-[#1A1A1A]">{profile?.major || "Omnidisciplinary"}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-space-grotesk uppercase tracking-widest text-[#9CA3AF]">Core Interests</label>
              {isEditing ? (
                <input 
                  type="text"
                  value={formData.interests || ""}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  placeholder="Separate with commas..."
                  className="w-full bg-[#F4F2ED] border-none rounded-xl p-3 font-space-grotesk focus:ring-2 focus:ring-[#4E6E81]/20 transition-all outline-none"
                />
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {profile?.interests?.split(",").map((interest, i) => (
                    <span key={i} className="px-3 py-1 bg-[#F4F2ED] text-[#4E6E81] rounded-full text-sm font-space-grotesk">
                      {interest.trim()}
                    </span>
                  )) || <p className="text-[#9CA3AF] text-sm italic">No specific interests noted.</p>}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Meta Info & Socials */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#F4F2ED] pb-4">
              <Mail className="w-5 h-5 text-[#4E6E81]" />
              <h2 className="text-xl font-literata font-bold">Connections</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F2ED] flex items-center justify-center text-[#4E6E81] group-hover:bg-[#4E6E81] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">Email</p>
                  <p className="text-sm font-space-grotesk text-[#1A1A1A]">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F2ED] flex items-center justify-center text-[#4E6E81] group-hover:bg-[#4E6E81] group-hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">Instagram</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.instagram || ""}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      className="w-full bg-[#F4F2ED] border-none rounded-lg p-1 text-sm font-space-grotesk outline-none"
                      placeholder="@username"
                    />
                  ) : (
                    <p className="text-sm font-space-grotesk text-[#1A1A1A]">{profile?.instagram || "-"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F2ED] flex items-center justify-center text-[#4E6E81] group-hover:bg-[#4E6E81] group-hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">LinkedIn</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.linkedIn || ""}
                      onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
                      className="w-full bg-[#F4F2ED] border-none rounded-lg p-1 text-sm font-space-grotesk outline-none"
                      placeholder="Profile URL"
                    />
                  ) : (
                    <p className="text-sm font-space-grotesk text-[#1A1A1A] truncate max-w-[150px]">{profile?.linkedIn || "-"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F2ED] flex items-center justify-center text-[#4E6E81] group-hover:bg-[#4E6E81] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">Telos (Phone)</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-[#F4F2ED] border-none rounded-lg p-1 text-sm font-space-grotesk outline-none"
                    />
                  ) : (
                    <p className="text-sm font-space-grotesk text-[#1A1A1A]">{profile?.phone || "-"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-[#F4F2ED] pb-4">
              <MapPin className="w-5 h-5 text-[#4E6E81]" />
              <h2 className="text-xl font-literata font-bold">Metadata</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">Location</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-[#F4F2ED] border-none rounded-lg p-2 text-sm font-space-grotesk outline-none"
                  />
                ) : (
                  <p className="text-sm font-space-grotesk text-[#1A1A1A]">{profile?.location || "Unknown Dimension"}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF]">Chronos (Joined)</p>
                <p className="text-sm font-space-grotesk text-[#1A1A1A]">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Bar (Floating when editing) */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-[#E5E7EB] px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-6"
          >
            <p className="font-space-grotesk text-sm text-[#4E6E81]">Unsaved revisions in current draft</p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-space-grotesk text-gray-500 hover:text-gray-700"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-[#4E6E81] text-white rounded-xl font-space-grotesk text-sm hover:hover:bg-[#3D5A6C] disabled:opacity-50 transition-all font-bold"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Commit Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
