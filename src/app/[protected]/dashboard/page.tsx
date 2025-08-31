"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "../../../../lib/hook";

export default function DashboardPage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">
          Dashboard
        </h1>
        {user ? (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <img src="/logo.png" alt="MediCare Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-blue-800">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="text-blue-700 mb-1">
              Email: <span className="font-semibold">{user.email}</span>
            </div>
            <div className="text-blue-700 mb-1">
              Phone: <span className="font-semibold">{user.phone}</span>
            </div>
            <div className="text-blue-700 mb-1">
              Blood Type:{" "}
              <span className="font-semibold">{user.bloodType}</span>
            </div>
            <div className="text-blue-700 mb-1">
              Address: <span className="font-semibold">{user.address}</span>
            </div>
          </div>
        ) : (
          <div className="text-red-600">No user info found.</div>
        )}
        <Link
          href="/gps/find-clinic"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-800"
        >
          <MapPin className="h-5 w-5" />
          Find Closest Clinic
        </Link>
      </div>
    </div>
  );
}
