"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Heart, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";
import authSlice, { User } from "../../../../lib/user";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [autoLogout, setAutoLogout] = useState(false);
  const { loginSuccess } = authSlice.actions;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempts((prev) => prev + 1);

    setLoading(true);

    // Terrible functionality: Wrong user data regardless of input

    const localStorageUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as User[];

    const user = localStorageUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Show success message with wrong email
      alert(`Welcome back, ${user.firstName}! Logged in as ${user.email}`);
      dispatch(loginSuccess(user));
      localStorage.setItem("auth_token", user.password);
      router.push("/dashboard");
    } else {
      alert(`Wrong Email or Password`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center py-12 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200 opacity-20 rounded-full blur-2xl -z-10 animate-pulse"></div>
      <div className="max-w-md w-full px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white shadow-lg rounded-full p-4 border border-blue-100 transition-transform hover:scale-105 duration-300">
            <img
              src="/logo.png"
              alt="MediCare Logo"
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
        {/* Auto-logout notification */}
        {autoLogout && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow animate-fade-in">
            <p className="text-sm">
              Auto-logout for security! Please sign in again.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl shadow animate-bounce">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-blue-900 tracking-tight">
                MediCare
              </span>
              <div className="text-xs text-blue-600 font-semibold">
                Emergency Ready
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2 drop-shadow">
            Welcome Back
          </h1>
          <p className="text-blue-700 font-medium">
            Sign in to access your emergency profile
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 shadow flex items-center gap-3">
          <Shield className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800">
              Enhanced Security Active
            </h3>
            <p className="text-xs text-blue-700">
              Auto-logout every 30 seconds for your protection
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100 transition-shadow hover:shadow-blue-300 duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-blue-50 placeholder-blue-300 transition-all duration-200 text-black"
                placeholder="Enter your email"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-blue-50 placeholder-blue-300 transition-all duration-200 text-black"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-blue-400 hover:text-blue-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Attempt counter */}
            {attempts > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow animate-fade-in">
                <p className="text-sm text-yellow-800 font-medium">
                  Login attempts: {attempts} | Wait time: {attempts * 2 + 3}{" "}
                  seconds
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying Identity...
                </div>
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                alert(
                  "Please contact support and provide your social security number, mother's maiden name, and first pet's birthday"
                )
              }
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-blue-700 font-medium">
            Don't have an account?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
