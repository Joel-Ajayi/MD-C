"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, store } from "../../lib/store";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  //   initialize store if not store
  if (!storeRef.current) storeRef.current = store;

  return <Provider store={storeRef.current}>{children}</Provider>;
}
