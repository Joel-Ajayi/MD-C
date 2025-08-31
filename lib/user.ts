import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStore = {
  isAuth: boolean;
  user: User | null;
};

export type User = {
  id: number;
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  terms: boolean;
};

export const initialState: AuthStore = {
  isAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: "User Auth",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      return { ...state, isAuth: true, user: action.payload };
    },
    logout: (state, _: PayloadAction<any>) => {
      localStorage.removeItem("auth_token");
      return { ...state, isAuth: false, user: null };
    },
  },
});

export default authSlice;
