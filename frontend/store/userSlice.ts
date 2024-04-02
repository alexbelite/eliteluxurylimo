// Redux Imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { UserProps } from "@/types";

// Define the initial state using that type
const initialState: UserProps | null = null as UserProps | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<UserProps>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
