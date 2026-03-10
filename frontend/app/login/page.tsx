"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import { saveToken } from "../../lib/auth";
export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");