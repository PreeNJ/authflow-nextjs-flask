import { Suspense } from "react";

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950" />}>
            {children}
        </Suspense>
    );
}
