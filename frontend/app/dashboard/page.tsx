"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import { getToken, removeToken } from "../../lib/auth";
type UserProfile = {
  id: number;
  email: string;
  created_at?: string;
};
export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        removeToken();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Loading dashboard...</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">User ID:</span> {user?.id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          {user?.created_at && (
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          You are successfully logged in to a protected route.
        </p>
      </div>
    </main>
  );
}