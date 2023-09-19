//This is CustomerAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../../Models/Admin';
import { CouponCompany } from '../../Models/CouponCompany';

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
     
    addedCouponAction(state, action: PayloadAction<CouponCompany>) {
      state.coupons.push(action.payload.coupon);
    },
    
    updatedCouponAction(state, action: PayloadAction<CouponCompany>) {
      const updatedCoupon = action.payload;
      const idx = state.coupons.findIndex((coupon) => coupon.id === updatedCoupon.id);
    
      if (idx !== -1) {
        // Use Object.assign or spread (...) operator to create a new object
        // with the updated values instead of modifying the existing object.
        // This ensures that Redux detects the state change correctly.
        state.coupons[idx] = { ...state.coupons[idx], ...updatedCoupon };
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
