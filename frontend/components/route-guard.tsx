"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";

export default function RouteGuard({
    children,
    requireAuth = true,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
}) {
    const router = useRouter();
    const { isAuthenticated, initializing } = useAuth();

    useEffect(() => {
        if (initializing) {
            return;
        }

        if (requireAuth && !isAuthenticated) {
            router.replace("/login");
        }
    }, [initializing, isAuthenticated, requireAuth, router]);

    if (initializing || (requireAuth && !isAuthenticated)) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700">Checking access...</p>
            </main>
        );
    }

    return <>{children}</>;
}