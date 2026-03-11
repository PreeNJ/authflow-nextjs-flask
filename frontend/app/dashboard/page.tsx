"use client";
import { useEffect, useState } from "react";
import { User, Mail, Calendar, CheckCircle, Loader } from "lucide-react";
import api from "../../lib/api";
import RouteGuard from "../../components/route-guard";
import { useAuth } from "../../lib/auth-context";

type UserProfile = {
  id: number;
  email: string;
  created_at?: string;
};

export default function DashboardPage() {
  const { token, logout, initializing } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.registerUnauthorizedHandler(() => logout("unauthorized"));

    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/user/profile", {});
        setUser(response.data);
      } catch {
        logout("unauthorized");
      } finally {
        setLoading(false);
      }
    };

    if (!initializing) {
      fetchProfile();
    }
  }, [initializing, logout, token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-4 animate-spin">
            <Loader className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg text-orange-100">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <RouteGuard>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-orange-600/80 to-red-600/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-orange-400/20 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Welcome back!</h1>
                <p className="text-orange-100">You&apos;re successfully authenticated and secure</p>
              </div>
            </div>
          </div>

          {/* Profile Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* User ID Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-orange-400/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-sm font-medium text-orange-200">User ID</h3>
              </div>
              <p className="text-2xl font-bold text-white">{user?.id}</p>
            </div>

            {/* Email Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-orange-400/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-sm font-medium text-orange-200">Email Address</h3>
              </div>
              <p className="text-lg font-semibold text-white break-all">{user?.email}</p>
            </div>

            {/* Created At Card */}
            {user?.created_at && (
              <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-orange-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-sm font-medium text-orange-200">Member Since</h3>
                </div>
                <p className="text-lg font-semibold text-white">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Status Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-orange-400/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-sm font-medium text-orange-200">Status</h3>
              </div>
              <p className="text-lg font-semibold text-green-400">Active & Verified</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4">
            <p className="text-sm text-orange-200">
              ✓ You are successfully authenticated on a protected route with automatic token expiration handling and real-time session management.
            </p>
          </div>
        </div>
      </main>
    </RouteGuard>
  );
}