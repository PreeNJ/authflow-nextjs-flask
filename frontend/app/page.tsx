import { Shield, Lock, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-6">
            <Shield className="w-8 h-8 text-orange-400" />
          </div>

          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            AuthFlow
          </h1>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Enterprise-grade authentication for modern applications.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-orange-400/20">
              <Lock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Secure JWT Auth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-orange-400/20">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Token Expiry</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-orange-400/20">
              <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-sm text-orange-100">Route Guards</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-lg font-semibold border border-orange-400/30 hover:bg-white/20 transition"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}