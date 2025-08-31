"use client";
import { Heart, Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import authSlice from "../../lib/user";
import { useAppDispatch, useAppSelector } from "../../lib/hook";

export default function LandingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isAuth);

  // Logout handler placeholder
  const handleLogout = () => {
    dispatch(authSlice.actions.logout(null));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="MediCare Logo" className="h-12 w-12" />
          <span className="text-2xl font-extrabold text-blue-900 tracking-tight">
            MediCare
          </span>
        </div>
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router.push("/auth/signin")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-800"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold shadow hover:from-green-700 hover:to-green-800"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/dashboard")}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-800"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r cursor-pointer from-red-600 to-red-700 text-white rounded-lg font-semibold shadow hover:from-red-700 hover:to-red-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 gap-12">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight drop-shadow">
            Emergency Care, <span className="text-green-600">Ready</span> When
            You Need It
          </h1>
          <p className="text-xl text-blue-700 mb-8 font-medium">
            Trusted by thousands, MediCare provides instant access to your
            emergency profile, ensuring fast, secure, and reliable care when
            every second counts.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/find-clinic")}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2"
            >
              Find Closest Clinic <ArrowRight className="h-5 w-5" />
            </button>
            {!isLoggedIn ? (
              <button
                onClick={() => router.push("/auth/signin")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute -top-8 -left-8 bg-white rounded-full shadow-lg p-4 border border-blue-100">
              <Heart className="h-12 w-12 text-red-500" />
            </div>
            <img
              src="/hero-medical.png"
              alt="Emergency Medical Care"
              className="rounded-3xl shadow-2xl border-4 border-blue-100 w-[400px] h-[400px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-white rounded-full shadow-lg p-4 border border-green-100">
              <Shield className="h-12 w-12 text-green-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-xl p-8 shadow flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-blue-700">
              Your data is protected with industry-leading security and privacy
              standards.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-8 shadow flex flex-col items-center text-center">
            <Heart className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">
              Instant Access
            </h3>
            <p className="text-green-700">
              Emergency responders get your vital info instantly, saving
              precious time.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-8 shadow flex flex-col items-center text-center">
            <ArrowRight className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Easy to Use
            </h3>
            <p className="text-blue-700">
              Simple, intuitive design for all ages. Get started in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src="/logo.png" alt="MediCare Logo" className="h-10 w-10" />
            <span className="font-bold text-lg">MediCare</span>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} MediCare Emergency App. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
