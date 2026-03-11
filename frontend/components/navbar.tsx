"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../lib/auth-context";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout: doLogout } = useAuth();

  const authPage = pathname === "/login" || pathname === "/signup";

  const handleLogout = () => {
    doLogout("manual");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-400/20 bg-gradient-to-r from-slate-950 to-orange-950 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-300 hover:to-red-300 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">A</span>
          </div>
          AuthFlow
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-orange-100 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500/80 to-red-600/80 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-red-600 transition font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            !authPage && (
              <>
                <Link
                  href="/login"
                  className="text-orange-100 px-3 py-2 rounded-lg hover:bg-white/10 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}