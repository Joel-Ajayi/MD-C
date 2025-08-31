"use client";

import { useLayoutEffect, useState } from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useAppSelector } from "../../lib/hook";
import Loader from "@/Loader/Loader";

const createSelectorFromPath = (path: string) => (state: any) => {
  return path.split(".").reduce((acc, key) => acc?.[key], state);
};

export default function ProtectedRoute({
  path,
  isNegative = false,
  redirect_path = "",
  includeCurrentPath = false,
  children,
}: {
  path: string;
  isNegative?: boolean;
  includeCurrentPath?: boolean;
  redirect_path?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const constraint = useAppSelector(createSelectorFromPath(path)) as boolean;

  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    const redirectFromPath =
      redirect_path || searchParams.get("redirect") || "/";

    const isValid = isNegative ? !constraint : constraint;

    if (!isValid) {
      let redirectLink = `${redirectFromPath}`;
      redirectLink += includeCurrentPath
        ? `?redirect=${encodeURIComponent(pathname)}`
        : "";
      setIsLoading(false);
      redirect(redirectLink);
    }

    setIsLoading(false);
  }, [constraint]);

  return isLoading ? <Loader radius={70} isFixed /> : children;
}

// Alakamayowa1@gmail.com
