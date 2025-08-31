"use client";

import ProtectedRoute from "@/app/ProtectedRoute";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <ProtectedRoute
        path="user.isAuth"
        includeCurrentPath
        redirect_path={"/auth/signup"}
      >
        {children}
      </ProtectedRoute>
    </Suspense>
  );
}
