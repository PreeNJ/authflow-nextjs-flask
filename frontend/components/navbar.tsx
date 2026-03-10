"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "../lib/auth";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-bold">AuthFlow</h1>
      <button
        onClick={logout}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}