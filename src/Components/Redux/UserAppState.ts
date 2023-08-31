import { Type } from './../../Models/User';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResModel } from "../../Models/Login";
import { ReactNode } from "react";

// This is the Contract
interface UserState {
  token: any;
  email: ReactNode;
  user: LoginResModel;
  // Type: Type;
}

// This is the initialized User State - initialized with an empty token and email
const initialState: UserState = {
  user: { token: "", email: "" },
  token: undefined,
  email: undefined,
  // type: "",
};

// These are all possible actions
export enum ActionType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

// This is UserSlice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedInAction(state, action: PayloadAction<LoginResModel>) {
      state.user = action.payload;
      // state.type = action.payload.type; // Set the 'type' property from the payload
    },

    userLoggedOutAction(state) {
      state.user = initialState.user;
      // state.type = ""; // Reset the 'type' property
    },

  },
  
});

// Export the action creators with their original names
export const {
  userLoggedInAction,
  userLoggedOutAction,
} = UserSlice.actions;

// Export the reducer
export const userReducer = UserSlice.reducer;
