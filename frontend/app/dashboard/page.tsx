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