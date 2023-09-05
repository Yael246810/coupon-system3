import { ClientType } from './../../Models/User';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// This is the Contract
interface UserState {
  id: number;
  token: string;
  email: string;
  type: ClientType;
}

// This is the initialized User State - initialized with an empty token and email
const initialState: UserState = {
  email: "",
  id: 0,
  token: "",
  type: ClientType.COMPANY
};

// These are all possible actions
export enum ActionType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedInAction(state, action: PayloadAction<UserState>) {
      // Update the existing state with the payload data
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.type = action.payload.type;
      console.log("new state after login - token= " + state.token + " type = " + state.type + " email: " + state.email);
    },

    userLoggedOutAction(state) {
      // Reset the state to the initial state
      state.email = initialState.email;
      state.id = initialState.id;
      state.token = initialState.token;
      state.type = initialState.type;
      console.log("2: " + state.token);
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
