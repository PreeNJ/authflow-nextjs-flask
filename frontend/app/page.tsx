export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          AuthFlow Next.js + Flask
        </h1>

        <p className="text-gray-600 mb-6">
          A full-stack authentication starter with signup, login, JWT auth, and
          a protected dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="bg-black text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            Sign Up
          </a>
          <a
            href="/login"
            className="border border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}