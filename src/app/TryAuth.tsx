"use client";

import { useEffect, useState } from "react";
import Loader from "@/Loader/Loader";
import authSlice, { User } from "../../lib/user";
import { useAppDispatch } from "../../lib/hook";

const wrongUserProfiles: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    address: "123 Main St, Cityville",
    emergencyContact: "Jane Doe - 987-654-3210",
    bloodType: "O+",
    terms: true,
    email: "hdhdb@gmail.com",
    password: "password123",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "987-654-3210",
    dateOfBirth: "1985-05-15",
    address: "456 Elm St, Townsville",
    emergencyContact: "John Smith - 123-456-7890",
    bloodType: "A-",
    terms: true,
    email: "adam@gmail.com",
    password: "password456",
  },
];

export default function TryAuth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { loginSuccess } = authSlice.actions;
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const localStorageUsers = JSON.parse(
        localStorage.getItem("users") || "[]"
      ) as User[];
      if (localStorageUsers.length === 0) {
        localStorage.setItem("users", JSON.stringify(wrongUserProfiles));
      }

      // get auth token from local storage
      const token = localStorage.getItem("auth_token") || "";
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const user = users.find((u) => u.password === token);
      if (user) {
        dispatch(loginSuccess(user));
      }

      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <Loader radius={70} isFixed /> : children;
}
