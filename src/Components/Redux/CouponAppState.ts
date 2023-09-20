import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponModel } from "../../Models/Admin";
import { CouponCompany } from "../../Models/CouponCompany";

interface CouponsState {
  coupons: CouponModel[];
}

const initialState: CouponsState = {
  coupons: [],
};

export enum ActionType {
  GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
  GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
  ADDED_COUPON = "ADDED_COUPON",
  UPDATED_COUPON = "UPDATED_COUPON",
  DELETED_COUPON = "DELETED_COUPON",
  REMOVED_COUPONS = "REMOVED_COUPONS",
}

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    gotAllCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },
    gotSingleCouponAction(state, action: PayloadAction<CouponModel>) {
      state.coupons.push(action.payload);
    },

    addedCouponAction(state, action: PayloadAction<CouponCompany>) {
      state.coupons.push(action.payload.coupon);
    },

    updatedCouponAction(state, action: PayloadAction<CouponCompany>) {
      const updatedCoupon = action.payload;
      const idx = state.coupons.findIndex(
        (coupon) => coupon.id === updatedCoupon.id
      );

      if (idx !== -1) {
        state.coupons[idx] = { ...state.coupons[idx], ...updatedCoupon };
      }
    },

    deletedCouponAction(state, action: PayloadAction<number>) {
      state.coupons = state.coupons.filter(
        (coupon) => coupon.id !== action.payload
      );
    },

    removeCoupons(state) {
      state.coupons = [];
    },
  },
});

export const {
  gotAllCouponsAction,
  gotSingleCouponAction,
  addedCouponAction,
  updatedCouponAction,
  deletedCouponAction,
  removeCoupons,
} = couponsSlice.actions;

export const couponsReducer = couponsSlice.reducer;
