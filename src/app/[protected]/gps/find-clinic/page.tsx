"use client";
import React, { useState } from "react";
import { MapPin, Hospital, ArrowRight, Navigation, User } from "lucide-react";
import { useAppSelector } from "../../../../../lib/hook";

const fakeClinics = [
  {
    name: "City Hospital",
    address: "123 Main St, Anytown",
    type: "General",
    status: "Open 24/7",
    distance: "2.5 km",
    directions: "Head north on Main St, then turn right onto 2nd Ave.",
  },
  {
    name: "Town Emergency Room",
    address: "456 Elm St, Othertown",
    type: "Emergency",
    status: "Open 24/7",
    distance: "3.2 km",
    directions:
      "Take the 1st left onto Elm St, destination will be on the right.",
  },
  {
    name: "Village Clinic",
    address: "789 Oak St, Villagetown",
    type: "Clinic",
    status: "Open 8 AM - 8 PM",
    distance: "5.1 km",
    directions:
      "Continue straight on Oak St for 5 km, clinic will be on the left.",
  },
];

function ClinicContent() {
  const [showDirections, setShowDirections] = useState<number | null>(null);
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-12">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2">
          <User className="h-7 w-7 text-blue-600" />
          <span className="text-lg font-bold text-blue-900">
            {user ? `${user.firstName} ${user.lastName}` : "Unknown User"}
          </span>
        </div>
        {user && <div className="text-blue-700 text-sm">{user.email}</div>}
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="bg-white shadow-lg rounded-full p-4 border border-blue-100 mb-4">
          <MapPin className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
          Find Closest Clinic
        </h1>
        <p className="text-blue-700 font-medium text-center">
          Get directions to the nearest emergency room (or not).
        </p>
      </div>

      {/* Location */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 shadow flex flex-col items-center w-full max-w-lg">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-6 w-6 text-blue-500" />
          <span className="text-lg font-semibold text-blue-800">
            Your Location
          </span>
        </div>
        <div className="text-xl font-bold text-red-600">Antarctica</div>
        <div className="text-sm text-blue-700 mt-2">
          (GPS error: Unable to determine actual location. Defaulting to
          Antarctica.)
        </div>
      </div>

      {/* Clinic List */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Nearby Emergency Rooms
        </h2>
        <div className="space-y-6">
          {fakeClinics.map((clinic, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col md:flex-row items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Hospital className="h-10 w-10 text-green-500" />
                <div>
                  <div className="text-lg font-bold text-blue-900">
                    {clinic.name}
                  </div>
                  <div className="text-sm text-blue-700">{clinic.address}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Type: {clinic.type} | Status:{" "}
                    <span className="text-red-600">{clinic.status}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Distance:{" "}
                    <span className="font-semibold text-blue-700">
                      {clinic.distance}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-end">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
                  onClick={() => setShowDirections(idx)}
                >
                  Get Directions <ArrowRight className="h-4 w-4" />
                </button>
                {showDirections === idx && (
                  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 w-64 shadow animate-fade-in">
                    <Navigation className="inline-block mr-2 text-blue-600" />
                    {clinic.directions}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center text-blue-700 text-sm">
        <div>
          <span className="font-bold">Note:</span> All clinics shown are closed
          veterinary clinics, thousands of kilometers away. Directions may be
          inaccurate or impossible.
        </div>
        <div className="mt-2">
          <span className="font-bold text-red-600">Warning:</span> Maps may
          suggest walking through oceans or taking multi-day journeys.
        </div>
      </div>
    </div>
  );
}

export default function FindClinicPage() {
  return <ClinicContent />;
}
