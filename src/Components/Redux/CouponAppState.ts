//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../../Models/Admin';

//This is the Contract
interface CouponsState {
			coupons: CouponModel[];
}

//This is the initialized Task Application State - initialize within empty array
const initialState: CouponsState = {
			coupons: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
			GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
            ADDED_COUPON = "ADDED_COUPON",
            UPDATED_COUPON = "UPDATED_COUPON",
            DELETED_COUPON = "DELETED_COUPON",
            REMOVED_COUPONS = "REMOVED_COUPONS",
}

//This is tasksSlice
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
     
    addedCouponAction(state, action: PayloadAction<CouponModel>) {
      state.coupons.push(action.payload);
    },
    
    updatedCouponAction(state, action: PayloadAction<CouponModel>) {
      const updatedCoupon = action.payload;
      const idx = state.coupons.findIndex(
        (coupon) => coupon.id === updatedCoupon.id
      );

      if (idx !== -1) {
        state.coupons[idx] = updatedCoupon;
      }
    },

    deletedCouponAction(state, action: PayloadAction<number>) {
      state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
    },
    
    removeCoupons(state) {
      state.coupons = [];
    },
  },
});


//This is the exported tasks
export const {
  gotAllCouponsAction,
  gotSingleCouponAction,
  addedCouponAction,
  updatedCouponAction,
  deletedCouponAction,
  removeCoupons,
} = couponsSlice.actions;


//Export the reducer
export const couponsReducer = couponsSlice.reducer;
