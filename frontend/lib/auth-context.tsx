"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken, getTokenExpiryMs, isTokenExpired, removeToken, saveToken } from "./auth";

type LogoutReason = "manual" | "expired" | "unauthorized";

type AuthContextValue = {
    token: string | null;
    isAuthenticated: boolean;
    initializing: boolean;
    login: (nextToken: string) => void;
    logout: (reason?: LogoutReason) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);
    const [initializing, setInitializing] = useState(true);
    const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearExpiryTimer = useCallback(() => {
        if (expiryTimerRef.current) {
            clearTimeout(expiryTimerRef.current);
            expiryTimerRef.current = null;
        }
    }, []);

    const logout = useCallback(
        (reason: LogoutReason = "manual") => {
            clearExpiryTimer();
            removeToken();
            setToken(null);

            if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
                const query = reason === "expired" ? "?reason=expired" : "";
                router.push(`/login${query}`);
            }
        },
        [clearExpiryTimer, pathname, router],
    );

    const scheduleExpiry = useCallback(
        (nextToken: string) => {
            clearExpiryTimer();

            const expiryMs = getTokenExpiryMs(nextToken);
            if (!expiryMs) {
                logout("expired");
                return;
            }

            const timeoutMs = expiryMs - Date.now();
            if (timeoutMs <= 0) {
                logout("expired");
                return;
            }

            expiryTimerRef.current = setTimeout(() => {
                logout("expired");
            }, timeoutMs);
        },
        [clearExpiryTimer, logout],
    );

    const login = useCallback(
        (nextToken: string) => {
            if (isTokenExpired(nextToken)) {
                logout("expired");
                return;
            }

            saveToken(nextToken);
            setToken(nextToken);
            scheduleExpiry(nextToken);
        },
        [logout, scheduleExpiry],
    );

    useEffect(() => {
        const existingToken = getToken();
        let cancelled = false;
        const timeoutId = setTimeout(() => {
            if (cancelled) {
                return;
            }

            if (existingToken && !isTokenExpired(existingToken)) {
                setToken(existingToken);
                scheduleExpiry(existingToken);
            } else {
                removeToken();
                setToken(null);
            }

            setInitializing(false);
        }, 0);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
            clearExpiryTimer();
        };
    }, [clearExpiryTimer, scheduleExpiry]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const onStorage = (event: StorageEvent) => {
            if (event.key !== "token") {
                return;
            }

            const latestToken = event.newValue;
            if (latestToken && !isTokenExpired(latestToken)) {
                setToken(latestToken);
                scheduleExpiry(latestToken);
            } else {
                clearExpiryTimer();
                setToken(null);
            }
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [clearExpiryTimer, scheduleExpiry]);

    const value = useMemo<AuthContextValue>(
        () => ({
            token,
            isAuthenticated: Boolean(token),
            initializing,
            login,
            logout,
        }),
        [initializing, login, logout, token],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return ctx;
}