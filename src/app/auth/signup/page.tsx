"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Heart,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  CheckCircle,
} from "lucide-react";
import authSlice, { User } from "../../../../lib/user";
import { useAppDispatch } from "../../../../lib/hook";

const SignupPage = () => {
  const [formData, setFormData] = useState<User>({
    id: JSON.parse(localStorage.getItem("users") || "[]").length + 1 || "1",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
    bloodType: "",
    terms: false,
  });

  const { loginSuccess } = authSlice.actions;

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as any).checked : value,
    }));
  };

  const handleNext = () => {
    // Terrible functionality: Steps go backwards randomly
    const shouldGoBackwards = Math.random() > 0.7;
    if (shouldGoBackwards && currentStep > 1) {
      setCurrentStep(currentStep - 1);
      return;
    }

    if (currentStep < 8) {
      // Terrible: 8 steps for simple signup
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    dispatch(loginSuccess(formData));
    localStorage.setItem("auth_token", formData.password);
    const localStorageUsers = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as User[];
    localStorageUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(localStorageUsers));
    setLoading(false);
    router.push("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
                placeholder="Please include street, city, state, country, continent, planet, galaxy..."
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Blood Type & Emergency Info
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+ (Positive Attitude)</option>
                <option value="B-">B- (Be Negative)</option>
                <option value="O">O (Oh No)</option>
                <option value="AB">AB (Always Bleeding)</option>
                <option value="XYZ">XYZ (Alien Blood)</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Create Super Secure Password
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal Agreements</h3>
            <div className="max-h-48 overflow-y-scroll border border-gray-200 rounded-lg p-4 text-xs text-gray-600">
              <p>
                By creating an account, you agree to our 247-page Terms of
                Service, Privacy Policy, Cookie Policy, Data Usage Agreement,
                Medical Liability Waiver, Arbitration Agreement, Class Action
                Waiver, and acknowledge that we may share your data with our
                1,247 trusted partners including but not limited to advertising
                networks, data brokers, government agencies, alien
                civilizations...
              </p>
              <p className="mt-4">[... 50 more paragraphs of legal text ...]</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                required
              />
              <label className="text-sm text-gray-700">
                I have read and agree to all terms and conditions (all 247
                pages)
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200 opacity-20 rounded-full blur-2xl -z-10 animate-pulse"></div>
      <div className="max-w-2xl mx-auto px-4">
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
            Create Your Account
          </h1>
          <p className="text-blue-700 font-medium">
            Join thousands who trust MediCare for emergency care
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-blue-700 font-medium">
              Step {currentStep} of 8
            </span>
            <span className="text-sm text-blue-700 font-medium">
              {Math.round((currentStep / 8) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100 transition-shadow hover:shadow-blue-300 duration-300">
          <form onSubmit={handleSubmit}>
            {/* Steps */}
            <div className="animate-fade-in">{renderStep()}</div>
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-6 py-2 text-blue-600 hover:text-blue-800 font-semibold rounded-lg transition-colors"
                disabled={currentStep === 1}
              >
                Previous
              </button>

              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 shadow transition-all duration-200"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-2 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 shadow transition-all duration-200"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <p className="text-blue-700 font-medium">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/signin")}
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
