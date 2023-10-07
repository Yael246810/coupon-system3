import { ClientType } from "./../../Models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  token: string;
  email: string;
  type: ClientType;
}

const initialState: UserState = {
  email: "",
  id: 0,
  token: "",
  type: ClientType.COMPANY,
};

export enum ActionType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedInAction(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.type = action.payload.type;
      console.log(
        "new state after login - token= " +
          state.token +
          " type = " +
          state.type +
          " email: " +
          state.email
      );
    },

    userLoggedOutAction(state) {
      state.email = initialState.email;
      state.id = initialState.id;
      state.token = initialState.token;
      state.type = initialState.type;
    },
  },
});

export const { userLoggedInAction, userLoggedOutAction } = UserSlice.actions;

export const userReducer = UserSlice.reducer;
