"use client";

import { useRouter } from "next/navigation";
import { removeToken } from "../lib/auth";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    removeToken();
    router.push("/login");
  };

