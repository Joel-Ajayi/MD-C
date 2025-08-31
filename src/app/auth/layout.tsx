"use client";

import ProtectedRoute from "@/app/ProtectedRoute";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <ProtectedRoute path="user.isAuth" isNegative includeCurrentPath>
        {children}
      </ProtectedRoute>
    </Suspense>
  );
}
