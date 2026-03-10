"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");